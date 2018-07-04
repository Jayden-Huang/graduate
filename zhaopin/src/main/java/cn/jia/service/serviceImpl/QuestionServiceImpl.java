package cn.jia.service.serviceImpl;

import cn.jia.common.ServerResponse;
import cn.jia.domain.Grade;
import cn.jia.domain.Question;
import cn.jia.dto.AnswerDto;
import cn.jia.dto.QuestionDto;
import cn.jia.mapper.GradeMapper;
import cn.jia.mapper.QuestionMapper;
import cn.jia.service.QuestionService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.common.collect.Lists;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Created by jia on 2017/12/5.
 * 问答管理
 */
@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionMapper questionMapper;
    @Autowired
    private GradeMapper gradeMapper;

    private  List<String>  ans = null;//存放答案的列表
    //查询全部
    public ServerResponse findAll(int pageIndex,int pageSize){
        PageHelper.startPage(pageIndex,pageSize);
        List<Question> questionList = questionMapper.findAll();
        if (questionList == null || questionList.size() == 0){
            return ServerResponse.buildErrorMsg("不存在任何问答");
        }
        List<QuestionDto> questionDtos = Lists.newArrayList();
        ans = Lists.newArrayList();
        for (Question q:questionList) {
            QuestionDto questionDto = entityToDto(q);
            questionDtos.add(questionDto);
        }
        PageInfo pageInfo = new PageInfo(questionList);
        pageInfo.setList(questionDtos);
        return ServerResponse.buildSuccessData(pageInfo);
    }


    //增加
    public ServerResponse add(Question question){
        question.setCreateTime(new Date());
        question.setUpdateTime(new Date());
        int i = questionMapper.insert(question);
        if (i<1){
            return ServerResponse.buildErrorMsg("新增失败");
        }
        return ServerResponse.buildSuccessMsg("新增成功");
    }

    //根据Id查询
    public ServerResponse findById(Integer id){
        if (id == null || id<1){
            return ServerResponse.buildErrorMsg("请求参数错误");
        }
        Question question = questionMapper.selectByPrimaryKey(id);
        if (question == null){
            return ServerResponse.buildErrorMsg("不存在相应的实体");
        }
        return ServerResponse.buildSuccessData(question);
    }
    //修改
    public ServerResponse update(Question question){
        question.setUpdateTime(new Date());
        int i = questionMapper.updateByPrimaryKeySelective(question);
        if (i<1){
            return ServerResponse.buildErrorMsg("更新失败");
        }
        return ServerResponse.buildSuccessMsg("更新成功");
    }
    //根据Type查询
    public ServerResponse findByType(String type,int pageIndex,int pageSize){
        PageHelper.startPage(pageIndex,pageSize);
        List<Question> questions = null;
        if (StringUtils.isEmpty(type)){
           questions = questionMapper.findAll();
        }else{
            questions = questionMapper.findByType(type);
        }
        PageInfo pageInfo = new PageInfo(questions);
        return ServerResponse.buildSuccessData(pageInfo);
    }
    //删除
    public ServerResponse delete(Integer id){
        if (id == null || id<1){
            return ServerResponse.buildErrorMsg("参数有误");
        }
        int i =  questionMapper.deleteByPrimaryKey(id);
        if (i < 1){
            return ServerResponse.buildErrorMsg("删除失败");
        }
        return ServerResponse.buildSuccessMsg("删除成功");
    }
    //随机生成
    public ServerResponse showRandomByType(String type){
        List<Question> questionList = questionMapper.selectQuestionRandomByType(type);
        if (questionList.isEmpty()){
            return ServerResponse.buildErrorMsg("没有数据");
        }
        List<QuestionDto> questionDtos = Lists.newArrayList();
        ans = Lists.newArrayList();
        for (Question q:questionList) {
            QuestionDto questionDto = entityToDto(q);
            questionDtos.add(questionDto);
        }
       return ServerResponse.buildSuccessData(questionDtos);

    }
    //计算成绩
    public ServerResponse getSrcore(List<HashMap<Object,Object>> map, int userId,String classify){
        Grade grade = gradeMapper.selectByUserId(userId);
        if (grade != null){
            return ServerResponse.buildErrorMsg("不可重复测试");
        }
        Integer a = 0;
        if (map.size()>0 && map.get(0)!=null) {  //至少有选一道题
            List<AnswerDto> answerDtos = change(map); //转换成List<AnsDto>
            // 计算分数
            a = countScore(answerDtos);
            //需要把ans置空
            ans = Lists.newArrayList();
        }
        grade = new Grade();
        grade.setScore(a.floatValue());
        grade.setUserId(userId);
        grade.setClassify(classify);
        int i = gradeMapper.insert(grade);
        if (i <1){
            return ServerResponse.buildErrorMsg("出现错误");
        }
        return ServerResponse.buildSuccessMsg("插入成功");
    }
    private QuestionDto entityToDto(Question question){
        QuestionDto questionDto = new QuestionDto();
        questionDto.setId(question.getId());
        questionDto.setqAnswer(question.getqAnswer());
        ans.add(question.getqAnswer());
        questionDto.setqClassify(question.getqClassify());
        questionDto.setqName(question.getqName());
        String[] arr = question.getqChose().split(";");
        questionDto.setqChose(arr);
        return questionDto;
     }


    /**
     * List<Map>对象转换成List<AnsDto>
     * @param map
     * @return
     */
     private List change(List<HashMap<Object,Object>> map){
         List<AnswerDto> answerDtos = Lists.newArrayList();
         for (int i = 0;i<map.size();i++){
             AnswerDto answerDto = new AnswerDto();
             //每一个子元素就是一个Map对象
             HashMap hashMap = map.get(i);
             Set<String> keys = hashMap.keySet();
             Iterator iterator = keys.iterator();
             while (iterator.hasNext()){
                 String key = (String) iterator.next();
                 if (key.equals("i")){
                     Object value = hashMap.get(key);
                     answerDto.setId((int)value);
                 }else {
                     Object value = hashMap.get(key);
                     //进行1/2/3/4 转换成A/B/C/D
                     String answer = changeNum((String) value);
                     answerDto.setAnswer(answer);
                 }
             }
             answerDtos.add(answerDto);
         }
         return answerDtos;
     }
     private String changeNum(String num){
         switch (num){
             case "1":
                return "A";
             case "2":
                 return "B";
             case "3":
                 return "C";
             case "4":
                 return "D";
             default:
                 return null;
         }
     }
     private int countScore(List<AnswerDto> answerDtos){
         int a = 0;
         for (int i = 0; i < answerDtos.size(); i++) {
             AnswerDto answerDto = answerDtos.get(i);
            if (ans.get(answerDto.getId()-1).equals(answerDto.getAnswer())){
                a++;
            }
         }
         return  a;
     }

}

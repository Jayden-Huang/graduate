package cn.jia.controller;

import cn.jia.common.ServerResponse;
import cn.jia.domain.Question;
import cn.jia.domain.User;
import cn.jia.dto.AnswerDto;
import cn.jia.exception.ErrorException;
import cn.jia.service.QuestionService;
import cn.jia.service.UserService;
import net.sf.json.JSONArray;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.objenesis.instantiator.android.AndroidSerializationInstantiator;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by jia on 2017/12/5.
 */
@Controller
@RequestMapping("/question")
public class QuestionController {
    @Autowired
    private QuestionService questionService;
    @Autowired
    private UserService userService;

    @GetMapping
  //  @ResponseBody
    public String show(Model model, HttpSession session){
        String username = (String) session.getAttribute("username");
        if (StringUtils.isEmpty(username)){
            return "login";
        }
        ServerResponse serverResponse = questionService.showRandomByType("逻辑");
       // return serverResponse;
        model.addAttribute("question",serverResponse.getData());
        return "www/question";
    }

    @PostMapping("/getByType")
    @ResponseBody
    public ServerResponse getByType(HttpSession session,String type) throws Exception{
        String username = (String) session.getAttribute("username");
        if (StringUtils.isEmpty(username)){
            throw new ErrorException("请登录");
        }
        return questionService.showRandomByType(type);
    }

    //计算分数@RequestBody List<HashMap<Object,Object>> map,@RequestBody String type,
    @PostMapping("/submit")
    @ResponseBody
    public ServerResponse countScore(String map, String classify, HttpSession session){
        String username = (String) session.getAttribute("username");
        if (StringUtils.isEmpty(username)){
            return ServerResponse.buildErrorMsg("请登录");
        }
        User user = userService.findByUsername(username);
        List<HashMap<Object,Object>> map1 = change(map);
        System.out.println(map1);
     //   return  null;
       return questionService.getSrcore(map1,user.getId(),classify);
    }


    /*-------------------------管理员---------------------------------*/

    //展现页面
    @RequiresRoles("admin")
    @GetMapping("/manager")
    public String manager(Model model,
                          @RequestParam(value = "pageIndex",defaultValue = "1",required = false)int pageIndex,
                          @RequestParam(value = "pageSize",defaultValue = "3",required = false)int pageSize){
        ServerResponse serverResponse = questionService.findAll(pageIndex,pageSize);
        model.addAttribute("question",serverResponse.getData());
        return "manage/question";
    }

  /*  //分页请求
    @GetMapping("/manager/page")
    @ResponseBody
    public ServerResponse findByPage(@RequestParam(value = "pageIndex",defaultValue = "1",required = false)int pageIndex,
                                     @RequestParam(value = "pageSize",defaultValue = "3",required = false)int pageSize){
        return questionService.findAll(pageIndex,pageSize);
    }*/

    //管理员
    @RequiresRoles("admin")
    @PostMapping("/add")
    @ResponseBody
    public ServerResponse add(Question question,HttpSession session){
        String username = (String) session.getAttribute("username");
        if (StringUtils.isEmpty(username)){
            return ServerResponse.buildErrorMsg("请登录");
        }
        return questionService.add(question);
    }

    @GetMapping("/getById/{id}")
    @ResponseBody
    @RequiresRoles("admin")
    public ServerResponse findById(@PathVariable(value = "id") int id,HttpSession session){
        String username = (String) session.getAttribute("username");
        if (StringUtils.isEmpty(username)){
            return ServerResponse.buildErrorMsg("请登录");
        }
        return questionService.findById(id);
    }

    @RequiresRoles("admin")
    @PostMapping("/update")
    @ResponseBody
    public ServerResponse update(Question question,HttpSession session){
        String username = (String) session.getAttribute("username");
        if (StringUtils.isEmpty(username)){
            return ServerResponse.buildErrorMsg("请登录");
        }
        return questionService.update(question);
    }

    @RequiresRoles("admin")
    @RequestMapping("/findByType")
    @ResponseBody
    public ServerResponse findByType(String type,HttpSession session,
                                     @RequestParam(value = "pageIndex",defaultValue = "1",required = false)int pageIndex,
                                     @RequestParam(value = "pageSize",defaultValue = "3",required = false)int pageSize){
        String username = (String) session.getAttribute("username");
        if (StringUtils.isEmpty(username)){
            return ServerResponse.buildErrorMsg("请登录");
        }
        return questionService.findByType(type,pageIndex,pageSize);
    }

    @RequiresRoles("admin")
    @DeleteMapping("/deleteById/{id}")
    @ResponseBody
    public ServerResponse detele(@PathVariable int id,HttpSession session){
        String username = (String) session.getAttribute("username");
        if (StringUtils.isEmpty(username)){
            return ServerResponse.buildErrorMsg("请登录");
        }
        return questionService.delete(id);
    }

    private static List change(String map){
        Map mapClass = new HashMap();
        JSONArray jsonArray = new JSONArray();
        List<HashMap<String,String>> map1 = (List<HashMap<String,String>>) JSONArray.toList(JSONArray.fromObject(map),mapClass.getClass());
        return map1;
    }
}

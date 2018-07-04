package cn.jia.mapper;

import cn.jia.domain.Grade;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface GradeMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Grade record);

    int insertSelective(Grade record);

    Grade selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Grade record);

    int updateByPrimaryKey(Grade record);

    Grade selectByUserIdAndType(@Param("userId") int userId,@Param("classify") String classify);

    Grade selectByUserId(int userId);
}
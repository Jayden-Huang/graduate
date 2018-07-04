package cn.jia.mapper;

import cn.jia.domain.Apply;
import org.apache.ibatis.annotations.Param;

/**
 * Created by jia on 2017/12/4.
 */
public interface ApplyMapper {

    int insert(Apply apply);
    Apply findByUserIdAndPId(@Param("userId")int userId,@Param("pId")int pId);

}

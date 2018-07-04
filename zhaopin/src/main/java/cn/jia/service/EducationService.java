package cn.jia.service;

import cn.jia.common.ServerResponse;
import cn.jia.domain.Education;
import cn.jia.dto.EducationDto;


/**
 * Created by jia on 2017/12/11.
 */
public interface EducationService {
    ServerResponse addOrUpdate(Education education, Integer userId);
    ServerResponse findByUserId(Integer userId);
    EducationDto entityToDto(Education education);
}

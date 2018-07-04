package cn.jia.service;

import cn.jia.common.ServerResponse;
import cn.jia.domain.Work;
import cn.jia.dto.WorkDto;

/**
 * Created by jia on 2017/12/11.
 */
public interface WorkService {
    ServerResponse addOrUpdate(Work work, Integer userId);
    ServerResponse findByUserId(Integer userId);
    WorkDto entityToDto(Work work);
}

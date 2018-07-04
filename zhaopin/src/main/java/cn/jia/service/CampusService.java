package cn.jia.service;

import cn.jia.common.ServerResponse;
import cn.jia.domain.Campus;
import cn.jia.dto.CampusDto;

/**
 * Created by jia on 2017/12/11.
 */
public interface CampusService {
    ServerResponse addOrUpdate(Campus campus, Integer userId);
    ServerResponse findByUserId(Integer userId);
    CampusDto entityToDto(Campus campus);
}

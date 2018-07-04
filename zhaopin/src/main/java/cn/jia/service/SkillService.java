package cn.jia.service;

import cn.jia.common.ServerResponse;
import cn.jia.domain.Skill;
import cn.jia.dto.SkillDto;

/**
 * Created by jia on 2017/12/11.
 */
public interface SkillService {
    ServerResponse addOrUpdate(Skill skill, Integer userId);
    ServerResponse findByUserId(Integer userId);
    SkillDto entityToDto(Skill skill);
}

package cn.jia.service;

import cn.jia.common.ServerResponse;
import cn.jia.domain.Project;
import cn.jia.dto.ProjectDto;

/**
 * Created by jia on 2017/12/11.
 */
public interface ProjectService {
    ServerResponse addOrUpdate(Project project, Integer userId);
    ServerResponse findByUserId(Integer userId);
    ProjectDto entityToDto(Project project);
}

package com.tc.fundService.mapper.admin;

import com.tc.fundService.entity.admin.ProjectProgress;

import java.util.List;

public interface ProjectProgressMapper {

    /**
     * 获取最新动态
     *
     */
    List<ProjectProgress> getNewStatus();

    /**
     * 获取项目进展
     *
     */
    List<ProjectProgress> getProjectProgress();

}

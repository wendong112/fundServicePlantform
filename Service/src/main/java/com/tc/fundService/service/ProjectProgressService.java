package com.tc.fundService.service;

import com.tc.fundService.entity.admin.ProjectProgress;

import java.util.List;

public interface ProjectProgressService {
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

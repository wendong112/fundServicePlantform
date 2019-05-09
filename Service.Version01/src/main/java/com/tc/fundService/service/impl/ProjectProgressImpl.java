package com.tc.fundService.service.impl;

import com.tc.fundService.entity.admin.ProjectProgress;
import com.tc.fundService.mapper.admin.ProjectProgressMapper;
import com.tc.fundService.service.ProjectProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectProgressImpl implements ProjectProgressService {
    @Autowired
    private ProjectProgressMapper projectProgressMapper;

    @Override
    public List<ProjectProgress> getNewStatus() {
        return projectProgressMapper.getNewStatus();
    }

    @Override
    public List<ProjectProgress> getProjectProgress() {
        return projectProgressMapper.getProjectProgress();
    }
}

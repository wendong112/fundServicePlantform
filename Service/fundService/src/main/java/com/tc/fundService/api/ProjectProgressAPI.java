package com.tc.fundService.api;

import com.tc.fundService.entity.admin.ProjectProgress;
import com.tc.fundService.service.ProjectProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ProjectProgressAPI {
    @Autowired
    private ProjectProgressService projectProgressService;

    /**
     * 获取最新动态
     */
    @RequestMapping(value = "/getNewStatus", method = RequestMethod.GET)
    private Map<String, Object> getNewStatus() {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<ProjectProgress> list = new ArrayList<ProjectProgress>();
        list = projectProgressService.getNewStatus();
        modelMap.put("getNewStatus", list);
        return modelMap;
    }

    /**
     * 获取项目进展
     */
    @RequestMapping(value = "/getProjectProgress", method = RequestMethod.GET)
    private Map<String, Object> getProjectProgress() {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<ProjectProgress> list = new ArrayList<ProjectProgress>();
        list = projectProgressService.getProjectProgress();
        modelMap.put("getProjectProgress", list);
        return modelMap;
    }
}

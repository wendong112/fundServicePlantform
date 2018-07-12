package com.tc.fundService.api;

import com.tc.fundService.entity.admin.DefectBriefReq;
import com.tc.fundService.service.DefectBriefReqService;
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
public class DefectBriefReqAPI {
    @Autowired
    private DefectBriefReqService defectBriefReqService;

    /**
     * 根据phone获取用户缺陷汇总信息
     */
    @RequestMapping(value = "/getUserBugInfo", method = RequestMethod.GET)
    private Map<String, Object> getUserBugInfo(String telephone) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<DefectBriefReq> list = new ArrayList<DefectBriefReq>();
        list = defectBriefReqService.getUserBugInfo(telephone);
        modelMap.put("getUserBugInfo", list);
        return modelMap;
    }

    /**
     * 列出所有主流缺陷
     */
    @RequestMapping(value = "/getMainBugInfo", method = RequestMethod.GET)
    private Map<String, Object> getMainBugInfo() {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<DefectBriefReq> list = new ArrayList<DefectBriefReq>();
        list = defectBriefReqService.getMainBugInfo();
        modelMap.put("getMainBugInfo", list);
        return modelMap;
    }

    /**
     * 列出所有缺陷用于搜索
     */
    @RequestMapping(value = "/getSearchBugInfo", method = RequestMethod.GET)
    private Map<String, Object> getSearchBugInfo() {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<DefectBriefReq> list = new ArrayList<DefectBriefReq>();
        list = defectBriefReqService.getSearchBugInfo();
        modelMap.put("getSearchBugInfo", list);
        return modelMap;
    }
}

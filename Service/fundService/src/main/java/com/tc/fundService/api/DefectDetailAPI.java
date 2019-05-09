package com.tc.fundService.api;

import com.tc.fundService.entity.admin.DefectBriefReq;
import com.tc.fundService.entity.admin.DefectDetail;
import com.tc.fundService.handler.FileUtil;
import com.tc.fundService.service.DefectDetailService;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/api")
public class DefectDetailAPI {
    @Autowired
    private DefectDetailService defectDetailService;

    /**
     * 根据id获取缺陷详情
     */
    @RequestMapping(value = "/getDefectById", method = RequestMethod.POST)
    private Map<String, Object> getDefectById(@RequestBody DefectBriefReq defectBriefReq) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        DefectDetail defectDetail = defectDetailService.getDefectById(defectBriefReq);
        modelMap.put("defectDetail", defectDetail);
        return modelMap;
    }
    /**
     * 插入新缺陷
     */
    @RequestMapping(value = "/addNewDefect", method = RequestMethod.POST)
    private Map<String, Object> addNewDefect(@RequestBody DefectDetail defectDetail) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("newDefect", defectDetailService.addNewDefect(defectDetail));
        return modelMap;
    }

    /**
     * 修改缺陷
     */
    @RequestMapping(value = "/modifyDefectById", method = RequestMethod.POST)
    private Map<String, Object> modifyDefectById(@RequestBody DefectDetail defectDetail) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("modifyDefectById", defectDetailService.modifyDefectById(defectDetail));
        return modelMap;
    }

}

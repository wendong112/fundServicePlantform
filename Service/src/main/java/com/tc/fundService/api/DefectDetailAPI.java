package com.tc.fundService.api;

import com.tc.fundService.entity.admin.DefectDetail;
import com.tc.fundService.service.DefectDetailService;
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
public class DefectDetailAPI {
    @Autowired
    private DefectDetailService defectDetailService;

    /**
     * 根据phone获取用户信息
     */
    @RequestMapping(value = "/getDefectById", method = RequestMethod.GET)
    private Map<String, Object> getDefectById(Integer id) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<DefectDetail> list = new ArrayList<DefectDetail>();
        list = defectDetailService.getDefectById(id);
        modelMap.put("getDefectById", list);
        return modelMap;
    }
    /**
     * 插入新缺陷
     */
    @RequestMapping(value = "/addNewDefect", method = RequestMethod.POST)
    private Map<String, Object> addNewDefect(@RequestBody DefectDetail defectDetail) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("addNewDefect", defectDetailService.addNewDefect(defectDetail));
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

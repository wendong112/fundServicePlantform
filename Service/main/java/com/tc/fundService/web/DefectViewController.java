package com.tc.fundService.web;

import com.tc.fundService.entity.DefectView;
import com.tc.fundService.service.DefectViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/superadmin")
public class DefectViewController {

    @Autowired
    private DefectViewService defectViewService;


    /**
     * 通过缺陷Id,获取缺陷视图里的字段信息
     *
     * @return
     */
    @RequestMapping(value = "/getdefectviewbyid", method = RequestMethod.GET)
    private Map<String, Object> getDefectViewById(Integer id) {

        Map<String, Object> modelMap = new HashMap<String, Object>();

        // 获取缺陷视图里的字段信息
        DefectView defectView = defectViewService.getDefectViewById(id);

        modelMap.put("defectView", defectView);

        return modelMap;
    }
}

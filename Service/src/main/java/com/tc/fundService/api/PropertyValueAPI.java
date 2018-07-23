package com.tc.fundService.api;

import com.tc.fundService.entity.defect.PropertyValue;
import com.tc.fundService.service.PropertyValueService;
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
public class PropertyValueAPI {
    @Autowired
    private PropertyValueService propertyValueService;
    /**
     * 获取所有版本
     */
    @RequestMapping(value = "/getAllVersion", method = RequestMethod.GET)
    private Map<String, Object> getAllVersion() {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<PropertyValue> list = new ArrayList<PropertyValue>();
        list = propertyValueService.getAllVersion();
        modelMap.put("getAllVersion", list);
        return modelMap;
    }

    /**
     * 获取主要版本
     */
    @RequestMapping(value = "/getMainVersion", method = RequestMethod.GET)
    private Map<String, Object> getMainVersion() {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<PropertyValue> list = new ArrayList<PropertyValue>();
        list = propertyValueService.getMainVersion();
        modelMap.put("getMainVersion", list);
        return modelMap;
    }

    /**
     * 获取所有与缺陷有关的设置值
     */
    @RequestMapping(value = "/getDefectPropertyValue", method = RequestMethod.GET)
    private Map<String, Object> getVersionModuleSeverity() {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<PropertyValue> list = new ArrayList<PropertyValue>();
        list = propertyValueService.getMainVersion();
        modelMap.put("getMainVersion", list);
        list = propertyValueService.getAllModule();
        modelMap.put("getAllModule", list);
        list = propertyValueService.getHeavySeverity();
        modelMap.put("getHeavySeverity", list);
        return modelMap;
    }
}

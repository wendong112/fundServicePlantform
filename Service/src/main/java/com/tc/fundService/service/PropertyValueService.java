package com.tc.fundService.service;

import com.tc.fundService.entity.defect.PropertyValue;

import java.util.List;

public interface PropertyValueService {

    /**
     * 获取所有支持的版本
     */
    List<PropertyValue> getAllVersion();
}

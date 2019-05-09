package com.tc.fundService.service;

import com.tc.fundService.entity.defect.PropertyValue;

import java.util.List;

public interface PropertyValueService {

    /**
     * 获取所有支持的版本
     */
    List<PropertyValue> getAllVersion();

    /**
     * 获取主要支持的版本
     */
    List<PropertyValue> getMainVersion();

    /**
     * 列出所有模块
     *
     */
    List<PropertyValue> getAllModule();

    /**
     * 列出严重和致命缺陷程度
     *
     */
    List<PropertyValue> getHeavySeverity();
}

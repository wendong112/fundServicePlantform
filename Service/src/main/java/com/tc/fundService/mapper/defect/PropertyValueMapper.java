package com.tc.fundService.mapper.defect;

import com.tc.fundService.entity.defect.PropertyValue;

import java.util.List;

public interface PropertyValueMapper {

    /**
     * 列出所有版本
     *
     * @return defectList
     */
    List<PropertyValue> getAllVersion();

    /**
     * 列出主要版本
     *
     * @return defectList
     */
    List<PropertyValue> getMainVersion();


    /**
     * 列出所有模块
     *
     * @return defectList
     */
    List<PropertyValue> getAllModule();

    /**
     * 列出严重缺陷程度
     *
     * @return defectList
     */
    List<PropertyValue> getHeavySeverity();
}

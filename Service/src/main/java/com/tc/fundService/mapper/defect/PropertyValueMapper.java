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
}

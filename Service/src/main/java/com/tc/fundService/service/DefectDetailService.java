package com.tc.fundService.service;

import com.tc.fundService.entity.admin.DefectDetail;

import java.util.List;

public interface DefectDetailService {
    /**
     * 通过手机号获取用户
     *
     * @param id
     * @return
     */
    List<DefectDetail> getDefectById(Integer id);

    /**
     * 插入新缺陷
     *
     */
    boolean addNewDefect(DefectDetail defectDetail);

    /**
     * 通过id更新缺陷
     */
    boolean modifyDefectById(DefectDetail defectDetail);
}

package com.tc.fundService.mapper.admin;

import com.tc.fundService.entity.admin.DefectDetail;

import java.util.List;

public interface DefectDetailMapper {
    /**
     * 根据缺陷id获取缺陷
     */

    List<DefectDetail> getDefectById(Integer id);
    /**
     * 插入新缺陷
     *
     * @param defectDetail
     */
    int addNewDefect(DefectDetail defectDetail);

    /**
     * 通过id更新缺陷
     *
     * @param defectDetail
     */
    int modifyDefectById(DefectDetail defectDetail);
}

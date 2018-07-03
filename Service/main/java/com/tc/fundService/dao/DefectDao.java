package com.tc.fundService.dao;

import com.tc.fundService.entity.Defect;

import java.util.List;

public interface DefectDao {

    /**
     * 列出缺陷列表
     *
     * @return defectList
     */
    List<Defect> queryDefect();

    /**
     * 根据defectId列出具体缺陷
     *
     * @return defect
     */
    Defect queryDefectById(int defectId);


    /**
     * 根据severityId列出具体缺陷
     *
     * @return defect
     */
    List<Defect> queryDefectBySeverityId(int severityId);


    /**
     * 插入缺陷信息
     *
     * @param defect
     * @return
     */
    int insertDefect(Defect defect);

    /**
     * 更新缺陷信息
     *
     * @param defect
     * @return
     */
    int updateDefect(Defect defect);

    /**
     * 删除缺陷信息
     *
     * @param defectId
     * @return
     */
    int deleteDefect(int defectId);

}

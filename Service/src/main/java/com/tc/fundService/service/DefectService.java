package com.tc.fundService.service;

import com.tc.fundService.entity.defect.Defect;

import java.util.List;

public interface DefectService {

    /**
     * 获取缺陷列表
     *
     * @return
     */
    List<Defect> getDefectList();

    /**
     * 通过缺陷Id获取缺陷信息
     *
     * @param id
     * @return
     */
    Defect getDefectById(int id);


    /**
     * 通过缺陷严重度severityId获取缺陷信息
     *
     * @param severityId
     * @return
     */
    List<Defect> getDefectBySeverityId(int severityId);

    /**
     * 增加缺陷信息
     *
     * @param defect
     * @return
     */
    boolean addDefect(Defect defect);

    /**
     * 修改缺陷信息
     *
     * @param defect
     * @return
     */
    boolean modifyDefect(Defect defect);

    /**
     * 删除缺陷信息
     *
     * @param id
     * @return
     */
    boolean deleteDefect(int id);

}

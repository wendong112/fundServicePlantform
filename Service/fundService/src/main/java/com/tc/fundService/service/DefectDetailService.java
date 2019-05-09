package com.tc.fundService.service;

import com.tc.fundService.entity.admin.BaseEntity;
import com.tc.fundService.entity.admin.DefectBriefReq;
import com.tc.fundService.entity.admin.DefectDetail;

import java.util.List;

public interface DefectDetailService {
    /**
     * 通过手机号获取用户
     *
     * @param defectBriefReq
     * @return
     */
    DefectDetail getDefectById(DefectBriefReq defectBriefReq);

    /**
     * 插入新缺陷
     *
     */
    BaseEntity addNewDefect(DefectDetail defectDetail);

    /**
     * 通过id更新缺陷
     */
    boolean modifyDefectById(DefectDetail defectDetail);
}

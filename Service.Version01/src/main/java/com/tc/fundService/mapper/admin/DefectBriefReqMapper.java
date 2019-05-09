package com.tc.fundService.mapper.admin;

import com.tc.fundService.entity.admin.DefectBriefReq;

import java.util.List;

public interface DefectBriefReqMapper {
    /**
     * 根据手机号列出当前用户的缺陷概述
     */
    List<DefectBriefReq> getUserBugInfo(String telephone);

    /**
     * 列出所有主流缺陷
     */
    List<DefectBriefReq> getMainBugInfo();

    /**
     * 列出所有缺陷用于搜索
     */
    List<DefectBriefReq> getSearchBugInfo();
}

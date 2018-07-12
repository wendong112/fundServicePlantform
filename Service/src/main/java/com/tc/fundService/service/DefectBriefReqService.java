package com.tc.fundService.service;

import com.tc.fundService.entity.admin.DefectBriefReq;

import java.util.List;

public interface DefectBriefReqService {

    /**
     * 通过手机号获取用户缺陷汇总信息
     *
     * @param telephone
     * @return
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

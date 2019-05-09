package com.tc.fundService.service;

import com.tc.fundService.entity.admin.BusinessReq;

import java.util.List;

public interface BusinessReqService {

    /**
     * 获取业务需求列表
     */
    List<BusinessReq> getAllBusinessReq();

    /**
     * 获取Top3业务需求列表
     */
    List<BusinessReq> getTop3BusinessReq();

    /**
     * 插入业务需求信息
     */
    boolean addBusinessReq(BusinessReq businessReq);

    /**
     * 更新业务需求信息
     */
    boolean modifyBusinessReq(BusinessReq businessReq);

    /**
     * 根据需求id获取业务场景
     */
    List<BusinessReq> getScenarioByReqId(Integer requirementId);

}

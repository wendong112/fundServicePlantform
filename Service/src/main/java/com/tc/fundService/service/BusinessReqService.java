package com.tc.fundService.service;

import com.tc.fundService.entity.admin.BusinessReq;

import java.util.List;

public interface BusinessReqService {

    /**
     * 获取业务需求列表
     */
    List<BusinessReq> getAllBusinessReq();

    /**
     * 插入业务需求信息
     */
    boolean addBusinessReq(BusinessReq businessReq);

    /**
     * 更新业务需求信息
     */
    boolean modifyBusinessReq(BusinessReq businessReq);
}

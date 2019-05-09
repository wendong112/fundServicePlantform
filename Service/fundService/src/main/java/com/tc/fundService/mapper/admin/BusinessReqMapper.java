package com.tc.fundService.mapper.admin;

import com.tc.fundService.entity.admin.BusinessReq;

import java.util.List;

public interface BusinessReqMapper {

    /**
     * 列出业务需求
     */
    List<BusinessReq> getAllBusinessReq();

    /**
     * 列出Top3业务需求
     */
    List<BusinessReq> getTop3BusinessReq();

    /**
     * 插入业务需求
     *
     * @param businessReq
     */
    int addBusinessReq(BusinessReq businessReq);

    /**
     * 更新业务需求
     *
     * @param businessReq
     */
    int modifyBusinessReq(BusinessReq businessReq);

    /**
     * 根据需求ID获取业务场景
     */
    List<BusinessReq> getScenarioByReqId(Integer requirementId);
}

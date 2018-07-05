package com.tc.fundService.mapper.admin;

import com.tc.fundService.entity.admin.BusinessReq;

import java.util.List;

public interface BusinessReqMapper {

    /**
     * 列出业务需求
     */
    List<BusinessReq> getAllBusinessReq();

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

}

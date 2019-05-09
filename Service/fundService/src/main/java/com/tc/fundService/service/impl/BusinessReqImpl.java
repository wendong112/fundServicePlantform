package com.tc.fundService.service.impl;

import com.tc.fundService.entity.admin.BusinessReq;
import com.tc.fundService.mapper.admin.BusinessReqMapper;
import com.tc.fundService.service.BusinessReqService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusinessReqImpl implements BusinessReqService {
    @Autowired
    private BusinessReqMapper businessReqMapper;

    @Override
    public List<BusinessReq> getAllBusinessReq() {
        return businessReqMapper.getAllBusinessReq();
    }

    @Override
    public List<BusinessReq> getTop3BusinessReq() {
        return businessReqMapper.getTop3BusinessReq();
    }

    @Override
    public boolean addBusinessReq(BusinessReq businessReq) {
        try {
            int effectedNum = businessReqMapper.addBusinessReq(businessReq);
            if (effectedNum > 0) {
                return true;
            } else {
                throw new RuntimeException("插入业务需求失败！");
            }
        } catch (Exception e) {
            throw new RuntimeException("插入业务需求失败:" + e.getMessage());
        }
    }

    @Override
    public boolean modifyBusinessReq(BusinessReq businessReq) {
        try {
            int effectedNum = businessReqMapper.modifyBusinessReq(businessReq);
            if (effectedNum > 0) {
                return true;
            } else {
                throw new RuntimeException("更新业务需求失败！");
            }
        } catch (Exception e) {
            throw new RuntimeException("更新业务需求失败:" + e.getMessage());
        }
    }

    @Override
    public List<BusinessReq> getScenarioByReqId(Integer requirementId) {
        return businessReqMapper.getScenarioByReqId(requirementId);
    }

}

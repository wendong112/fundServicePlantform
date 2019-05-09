package com.tc.fundService.service.impl;

import com.tc.fundService.entity.admin.DefectBriefReq;
import com.tc.fundService.mapper.admin.DefectBriefReqMapper;
import com.tc.fundService.service.DefectBriefReqService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DefectBriefReqImpl implements DefectBriefReqService {
    @Autowired
    private DefectBriefReqMapper defectBriefReqMapper;

    @Override
    public List<DefectBriefReq> getUserBugInfo(String telephone) {
        return defectBriefReqMapper.getUserBugInfo(telephone);
    }

    @Override
    public List<DefectBriefReq> getMainBugInfo() {
        return defectBriefReqMapper.getMainBugInfo();
    }

    @Override
    public List<DefectBriefReq> getSearchBugInfo() {
        return defectBriefReqMapper.getSearchBugInfo();
    }
}

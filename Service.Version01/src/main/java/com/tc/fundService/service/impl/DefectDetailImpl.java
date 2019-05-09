package com.tc.fundService.service.impl;

import com.tc.fundService.entity.admin.DefectDetail;
import com.tc.fundService.mapper.admin.DefectDetailMapper;
import com.tc.fundService.service.DefectDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DefectDetailImpl implements DefectDetailService {
    @Autowired
    private DefectDetailMapper defectDetailMapper;

    @Override
    public List<DefectDetail> getDefectById(Integer id) {
        return defectDetailMapper.getDefectById(id);
    }

    @Override
    public boolean addNewDefect(DefectDetail defectDetail) {
        try {
            int effectedNum = defectDetailMapper.addNewDefect(defectDetail);
            if (effectedNum > 0) {
                return true;
            } else {
                throw new RuntimeException("插入新缺陷失败！");
            }
        } catch (Exception e) {
            throw new RuntimeException("插入新缺陷失败:" + e.getMessage());
        }
    }

    @Override
    public boolean modifyDefectById(DefectDetail defectDetail) {
        try {
            int effectedNum = defectDetailMapper.modifyDefectById(defectDetail);
            if (effectedNum > 0) {
                return true;
            } else {
                throw new RuntimeException("修改缺陷失败！");
            }
        } catch (Exception e) {
            throw new RuntimeException("修改缺陷失败:" + e.getMessage());
        }
    }
}

package com.tc.fundService.service.impl;

import com.tc.fundService.dao.DefectViewDao;

import com.tc.fundService.entity.DefectView;
import com.tc.fundService.service.DefectViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DefectViewServiceImpl implements DefectViewService {

    @Autowired
    private DefectViewDao defectViewDao;



    @Override
    public DefectView getDefectViewById(int id) {
        return defectViewDao.queryDefectViewById(id);
    }
}

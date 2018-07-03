package com.tc.fundService.service;

import com.tc.fundService.entity.DefectView;

public interface DefectViewService {

    /**
     * 通过缺陷Id，获取缺陷视图里的字段信息
     *
     * @param id
     * @return
     */
    DefectView getDefectViewById(int id);


}

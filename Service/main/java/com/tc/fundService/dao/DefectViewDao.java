package com.tc.fundService.dao;

import com.tc.fundService.entity.DefectView;

public interface DefectViewDao {

    /**
     * 根据defectId列出缺陷视图里的字段信息
     * for example:
     * select * from mtf_project_database_10.defect_details_property_view where id=8
     *
     * @return DefectView //缺陷视图里的字段信息
     */
    DefectView queryDefectViewById(int defectId);

}

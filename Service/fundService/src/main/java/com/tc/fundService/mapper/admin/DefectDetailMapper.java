package com.tc.fundService.mapper.admin;

import com.tc.fundService.entity.admin.DefectDetail;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;
@Mapper
@Component(value = "DefectDetailMapper")
public interface DefectDetailMapper {
    /**
     * 根据缺陷id获取缺陷
     */
    List<DefectDetail> getDefectById(@Param("id") Integer id);

    /**
     * 插入新缺陷
     *
     * @param defectDetail
     */
    int addNewDefect(DefectDetail defectDetail);

    /**
     * 通过id更新缺陷
     *
     * @param defectDetail
     */
    int modifyDefectById(DefectDetail defectDetail);
}

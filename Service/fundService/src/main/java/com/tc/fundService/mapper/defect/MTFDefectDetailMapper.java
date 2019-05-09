package com.tc.fundService.mapper.defect;

import com.tc.fundService.entity.admin.DefectBriefReq;
import com.tc.fundService.entity.admin.DefectDetail;
import com.tc.fundService.entity.admin.UserReq;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component(value = "MTFDefectDetailMapper")
public interface MTFDefectDetailMapper {

    /**
     * 根据缺陷id获取缺陷详情
     *
     * @return defectList
     */
    DefectDetail getMTFDefectById(DefectBriefReq defectBriefReq);

    /**
     * 新增缺陷
     * @param defectDetail
     * @return
     */
    int addNewDefect(DefectDetail defectDetail);

    /**
     * 查询个人提交缺陷
     * @param user
     * @return
     */
    List<DefectBriefReq> getUserDefect(UserReq user);
}

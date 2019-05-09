package com.tc.fundService.entity.admin;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

/**
 * DefectBriefReq 信息
 *
 * @author sui wendong
 */
@Setter
@Getter
public class DefectDetail {
    private Integer createdUserId;              //创建人id
    private Integer statusId;                   //状态id
    private Integer projectId;                  //项目编号
    private Integer moduleId;                   //模块id
    private Integer findVersionId;              //发现缺陷版本id
    private Integer severityId;
    private Integer priorityId;
    private String telephone;
    private Date createdDate;
    private String title;
    private String defectDescription;
    private String expectDescription;
    private String solutionDescription;
    private Integer anonymousFlag;
    private Integer id;
    private String statusName;
    private String userName;
    private String formatCreatedDate;
    private String priorityName;
    private String severityName;
    private String findVersionName;
    private String planResolvedVersionName;
    private String patchNum;                    //补丁编号
    private String reproducible;
    private String userFlagMap;

    private List<String> materialList;  //素材列表

}

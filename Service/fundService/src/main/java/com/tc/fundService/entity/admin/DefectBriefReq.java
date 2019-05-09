package com.tc.fundService.entity.admin;

import lombok.Getter;
import lombok.Setter;

/**
 * DefectBriefReq 信息
 *
 * @author sui wendong
 */
@Setter
@Getter
public class DefectBriefReq {
    private Integer bugNum;
    private Integer bugFixNum;
    private String versionName;             //版本名称
    private String telephone;               //用户手机号
    private Integer id;                     //缺陷id
    private String title;                   //缺陷标题
    private Integer topFlag;
    private Integer mainFlag;
    private String userName;                //用户名
    private String companyName;             //公司名
    private Integer severityId;             //缺陷程度ID
    private Integer findVersionId;          //发现缺陷版本id
    private String planResolvedVersionId;  //计划修复版本id
    private Integer statusId;               //缺陷状态id
    private String statusName;              //缺陷状态
    private Integer priorityId;             //模块id
    private Integer platform;               //平台 0：web；1：微信小程序
    private String defectDescription;       //缺陷描述
    private String expectDescription;       //期望结果
    private String solutionDescription;     //解决方案描述

}

package com.tc.fundService.entity.defect;


import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * BusinessReqMapper 信息
 *
 * @author sui wendong
 */
@Setter
@Getter
public class Defect {
    // 主键ID
    private Integer id;
    //缺陷详细信息描述
    private String defectDescription;
    // 创建时间
    private Date createdDate;
    //缺陷提交人
    private String createdUserId_Name;
    //缺陷提交人对应的在后台数据库里的ID
    private String createdUserId;
    //缺陷修改日期
    private Date modifiedDate;
    //发现这个缺陷的测试版本
    private String findVersion;
    //缺陷发现的测试版本对应的数据库中的int类型的号码
    private Integer findVersionID;
    //一级模块前台显示中文名字
    private String firstLevelModulePriorityIdName;
    //一级模块前台显示中文名字的后台数据库里的对应数字值
    private Integer priorityId;
    //前端显示的缺陷的严重度
    private String severity;
    //前端显示的缺陷的严重度对应的后端数字值
    private Integer severityID;
    //缺陷概述
    private String title;
    //缺陷前提条件
    private String preCondition;
    //缺陷重现步骤
    private String reoccurSteps;
    //缺陷预期结果
    private String expectedResult;
    //缺陷实际结果
    private String actualResult;
    //缺陷备注
    private String defectNote;
    //缺陷状态ID
    private Integer statusId;
    //缺陷状态名称
    private String statusIdName;
}

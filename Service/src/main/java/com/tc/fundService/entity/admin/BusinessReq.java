package com.tc.fundService.entity.admin;

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
public class BusinessReq {
    // 主键REQUIREMENT_ID
    private Integer requirementId;
    private String requirementBriefDescription;
    private String requirementDescription;
    private String remark;
    private String telephone;
    private Integer companyId;
    private String companyName;
    private String processStatus;
    private String topFlag;
    private Date createDate;
    private String formatCreateDate;
    private Integer scenarioID;
    private String scenarioName;
    private String fatherNode;
}

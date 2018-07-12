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
    private String versionName;
    private String telephone;
    private Integer id;
    private String title;
    private Integer topFlag;
    private Integer mainFlag;
    private String userName;
    private String companyName;
    private String defectDescription;
    private String expectDescription;
    private String solutionDescription;
    private String statusName;
}

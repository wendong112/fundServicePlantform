package com.tc.fundService.entity.admin;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * DefectBriefReq 信息
 *
 * @author sui wendong
 */
@Setter
@Getter
public class DefectDetail {
    private Integer findVersionId;
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

    public Integer getId() {
        return id;
    }
}

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
public class PropertyValue {
    private Integer findVersionId;
    private String versionName;
    private Integer priorityId;
    private String priorityName;
    private Integer severityId;
    private String severityName;
}

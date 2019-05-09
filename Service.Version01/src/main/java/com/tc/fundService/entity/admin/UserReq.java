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
public class UserReq {
    private String serialNo;
    private String telephone;
    private String wechatId;
    private String wechatName;
    private String userName;
    private Integer companyId;
    private String companyName;
    private String mail;
    private String points;
    private String likeCount;
    private String authorizedFlag;
    private String authorizedType;
}

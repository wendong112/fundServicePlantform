package com.tc.fundService.entity.admin;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

/**
 * BusinessReqMapper 信息
 *
 * @author sui wendong
 */
@Setter
@Getter
public class Message {
    private Integer defectId;
    private Integer messageId;
    private String telephone;
    private String messageContent;
    private String formatMessageDate;
    private Date messageDate;
    private String userName;
    private String companyName;
    private String atUserName;
    private String atCompanyName;
    private String atTelephone;
}

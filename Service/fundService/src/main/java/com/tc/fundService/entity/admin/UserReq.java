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
    private String serialNo;             //
    private String telephone;            //电话
    private String wechatId;             //openid
    private String wechatName;           //微信名字
    private String userName;             //姓名
    private Integer companyId;           //公司ID
    private String companyName;          //公司名称
    private String mail;                 //邮箱
    private String points;               //积分
    private String likeCount;            //点赞数量
    private String authorizedFlag;       //授权标志
    private String authorizedType;       //权限类型
    private String headPath;             //头像路径
    private Integer vipLevel;            //VIP等级
    private String date;                 //注册日期
}

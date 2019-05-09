package com.tc.fundService.entity.admin;

import lombok.Getter;
import lombok.Setter;

/**
 * 自动化测试升级
 * @author wjg
 */
@Setter
@Getter
public class AutoTestUpgrade {
    private Integer id;                     //主键id
    private String systemName;              //系统名称
    private String date;                    //日期
    private String content;                 //内容
    private String upgradePackageSize;      //升级包大小
    private String version;                 //版本号
    private String abbreviation;            //系统简称
    private String publishOrg;              //发布机构
    private String type;                    //类别
    private String address;                 //地址

}

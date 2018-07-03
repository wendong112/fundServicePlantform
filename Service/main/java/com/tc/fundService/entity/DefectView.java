package com.tc.fundService.entity;

/**
 * DefectView 信息
 *
 * @author
 */


public class DefectView {

    private Integer id;

    //缺陷提交人
    private String createdUserIdName;

    //缺陷提交人对应的后台数据库ID
    private Integer createdUserId;

    //二级模块名字
    private String businessFieldIdName;

    //二级模块名字对应的后端数据库ID
    private Integer businessFieldId;

    //三级模块名字
    private String tradeTypeIDName;

    //二级模块名字对应的后端数据库ID
    private Integer tradeTypeID;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    public String getBusinessFieldIdName() {
        return businessFieldIdName;
    }

    public void setBusinessFieldIdName(String businessFieldIdName) {
        this.businessFieldIdName = businessFieldIdName;
    }

    public String getCreatedUserIdName() {
        return createdUserIdName;
    }

    public void setCreatedUserIdName(String createdUserIdName) {
        this.createdUserIdName = createdUserIdName;
    }

    public Integer getCreatedUserId() {
        return createdUserId;
    }

    public void setCreatedUserId(Integer createdUserId) {
        this.createdUserId = createdUserId;
    }

    public Integer getBusinessFieldId() {
        return businessFieldId;
    }

    public void setBusinessFieldId(Integer businessFieldId) {
        this.businessFieldId = businessFieldId;
    }

    public String getTradeTypeIDName() {
        return tradeTypeIDName;
    }

    public void setTradeTypeIDName(String tradeTypeIDName) {
        this.tradeTypeIDName = tradeTypeIDName;
    }

    public Integer getTradeTypeID() {
        return tradeTypeID;
    }

    public void setTradeTypeID(Integer tradeTypeID) {
        this.tradeTypeID = tradeTypeID;
    }
}

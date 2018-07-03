package com.tc.fundService.entity;


import java.util.Date;

/**
 * Defect 信息
 *
 * @author
 */

public class Defect {

    // 主键ID
    private Integer id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    //缺陷详细信息描述
    private String defectDescription;

    public String getDefectDescription() {
        return defectDescription;
    }

    public void setDefectDescription(String defectDescription) {
        this.defectDescription = defectDescription;
    }

    // 创建时间
    private Date createdDate;

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }


    //缺陷提交人
    private String createdUserId_Name;

    //缺陷提交人对应的在后台数据库里的ID
    private String createdUserId;


    //缺陷修改日期
    private Date modifiedDate;


    public Date getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(Date modifiedDate) {
        this.modifiedDate = modifiedDate;
    }


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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    //preCondition缺陷前提条件
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

    public String getPreCondition() {
        return preCondition;
    }

    public void setPreCondition(String preCondition) {
        this.preCondition = preCondition;
    }

    public String getReoccurSteps() {
        return reoccurSteps;
    }

    public void setReoccurSteps(String reoccurSteps) {
        this.reoccurSteps = reoccurSteps;
    }

    public String getExpectedResult() {
        return expectedResult;
    }

    public void setExpectedResult(String expectedResult) {
        this.expectedResult = expectedResult;
    }

    public String getActualResult() {
        return actualResult;
    }

    public void setActualResult(String actualResult) {
        this.actualResult = actualResult;
    }

    public String getDefectNote() {
        return defectNote;
    }

    public void setDefectNote(String defectNote) {
        this.defectNote = defectNote;
    }

    public String getFindVersion() {
        return findVersion;
    }

    public void setFindVersion(String findVersion) {
        this.findVersion = findVersion;
    }

    public Integer getFindVersionID() {
        return findVersionID;
    }

    public void setFindVersionID(Integer findVersionID) {
        this.findVersionID = findVersionID;
    }

    public String getFirstLevelModulePriorityIdName() {
        return firstLevelModulePriorityIdName;
    }

    public void setFirstLevelModulePriorityIdName(String firstLevelModulePriorityIdName) {
        this.firstLevelModulePriorityIdName = firstLevelModulePriorityIdName;
    }

    public Integer getPriorityId() {
        return priorityId;
    }

    public void setPriorityId(Integer priorityId) {
        this.priorityId = priorityId;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public Integer getSeverityID() {
        return severityID;
    }

    public void setSeverityID(Integer severityID) {
        this.severityID = severityID;
    }

    public Integer getStatusId() {
        return statusId;
    }

    public void setStatusId(Integer statusId) {
        this.statusId = statusId;
    }

    public String getStatusIdName() {
        return statusIdName;
    }

    public void setStatusIdName(String statusIdName) {
        this.statusIdName = statusIdName;
    }

    public String getCreatedUserId_Name() {
        return createdUserId_Name;
    }

    public void setCreatedUserId_Name(String createdUserId_Name) {
        this.createdUserId_Name = createdUserId_Name;
    }

    public String getCreatedUserId() {
        return createdUserId;
    }

    public void setCreatedUserId(String createdUserId) {
        this.createdUserId = createdUserId;
    }
}

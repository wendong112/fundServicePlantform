package com.tc.fundService.service;

import com.tc.fundService.entity.admin.AutoTestUpgrade;
import com.tc.fundService.entity.admin.BaseEntity;
import com.tc.fundService.entity.admin.Information;
import com.tc.fundService.entity.admin.UserReq;

import java.util.List;

/**
 * 我的信息Service
 * @author wjg
 * @version 2.0
 */
public interface MyService {

    /**
     * 用户注册
     * @param userReq
     * @return 基础信息
     */
    public BaseEntity userRegister(UserReq userReq);

    /**
     * 获取用户信息
     * @param userReq
     * @return
     */
    public UserReq getUserInfo(UserReq userReq);

    /**
     * 用户登录
     * @param userReq
     * @return
     */
    public BaseEntity userLogin(UserReq userReq);

    /**
     * 获取所有消息
     * @return
     */
    List<Information> getAllInformation();

    /**
     * 统计消息数量
     * @return
     */
    int countInformation();

    /**
     * 获取所有自动化测试升及信息
     * @return
     */
    List<AutoTestUpgrade> getAllAutoTestUpgradeMessage();
}

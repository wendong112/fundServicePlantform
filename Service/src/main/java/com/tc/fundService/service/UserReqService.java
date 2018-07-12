package com.tc.fundService.service;

import com.tc.fundService.entity.admin.UserReq;

import java.util.List;

public interface UserReqService {

    /**
     * 获取用户
     */
    List<UserReq> getAllUserInfo();

    /**
     * 获取排行榜
     */
    List<UserReq> getRankList();

    /**
     * 通过手机号获取用户
     *
     * @param telephone
     * @return
     */
    List<UserReq> getUserByPhone(String telephone);

    /**
     * 获取所有公司
     */
    List<UserReq> getAllCompany();

    /**
     * 插入注册的用户(delete)
     */
    boolean addUser(UserReq userReq);

    /**
     * 插入注册的用户
     */
    boolean addUserInfo(UserReq userReq);

    /**
     * 更新业务需求信息
     */
    boolean modifyLikeCountByPhone(UserReq userReq);

}

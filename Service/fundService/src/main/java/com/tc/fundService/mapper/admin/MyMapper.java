package com.tc.fundService.mapper.admin;

import com.tc.fundService.entity.admin.AutoTestUpgrade;
import com.tc.fundService.entity.admin.UserReq;
import org.springframework.stereotype.Component;

import java.util.List;

@Component(value = "MyMapper")
public interface MyMapper {

    /**
     * 插入新用户
     *
     * @param userReq
     */
    int addUserInfo(UserReq userReq);

    /**
     * 根据wechatId获取用户信息
     * @param userReq
     * @return
     */
    public UserReq getUserInfo(UserReq userReq);

    /**
     * 根据手机号获取用户信息
     * @param userReq
     * @return
     */
    UserReq getUserInfoByTelephone(UserReq userReq);

    /**
     * 获取所有自动化测试升及信息
     * @return
     */
    List<AutoTestUpgrade> getAllAutoTestUpgradeMessage();
}

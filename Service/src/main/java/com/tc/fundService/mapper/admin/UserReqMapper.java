package com.tc.fundService.mapper.admin;

import com.tc.fundService.entity.admin.UserReq;

import java.util.List;

public interface UserReqMapper {

    /**
     * 列出用户
     */
    List<UserReq> getAllUserInfo();

    /**
     * 列出基金公司排行榜
     */
    List<UserReq> getFundCompanyRank();
    /**
     * 根据手机号列出用户
     */

    List<UserReq> getUserByPhone(String telephone);

    /**
     * 获取所有公司
     */

    List<UserReq> getAllCompany();

    /**
     * 插入新用户
     *
     * @param userReq
     */
    int addUserInfo(UserReq userReq);

    /**
     * 更新点赞数量
     *
     * @param userReq
     */
    int modifyLikeCountByPhone(UserReq userReq);
}

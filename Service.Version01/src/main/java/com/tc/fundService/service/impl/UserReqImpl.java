package com.tc.fundService.service.impl;

import com.tc.fundService.entity.admin.UserReq;
import com.tc.fundService.mapper.admin.UserReqMapper;
import com.tc.fundService.service.UserReqService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserReqImpl implements UserReqService {
    @Autowired
    private UserReqMapper userReqMapper;

    @Override
    public List<UserReq> getAllUserInfo() {
        return userReqMapper.getAllUserInfo();
    }

    @Override
    public List<UserReq> getFundCompanyRank() {
        return userReqMapper.getFundCompanyRank();
    }

    @Override
    public List<UserReq> getUserByPhone(String telephone) {
        return userReqMapper.getUserByPhone(telephone);
    }

    @Override
    public List<UserReq> getAllCompany() {
        return userReqMapper.getAllCompany();
    }

    @Override
    public boolean addUserInfo(UserReq userReq) {
        try {
            int effectedNum = userReqMapper.addUserInfo(userReq);
            if (effectedNum > 0) {
                return true;
            } else {
                throw new RuntimeException("插入新用户失败！");
            }
        } catch (Exception e) {
            throw new RuntimeException("插入新用户失败:" + e.getMessage());
        }
    }

    @Override
    public boolean modifyLikeCountByPhone(UserReq userReq) {
        try {
            int effectedNum = userReqMapper.modifyLikeCountByPhone(userReq);
            if (effectedNum > 0) {
                return true;
            } else {
                throw new RuntimeException("更新点赞失败！");
            }
        } catch (Exception e) {
            throw new RuntimeException("更新点赞失败:" + e.getMessage());
        }
    }
}

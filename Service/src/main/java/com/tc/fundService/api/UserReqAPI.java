package com.tc.fundService.api;

import com.tc.fundService.entity.admin.UserReq;
import com.tc.fundService.service.UserReqService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserReqAPI {
    @Autowired
    private UserReqService userReqService;
    /**
     * 获取所有的用户信息
     */
    @RequestMapping(value = "/getAllUserInfo", method = RequestMethod.GET)
    private Map<String, Object> getAllUserInfo() {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<UserReq> list = new ArrayList<UserReq>();
        list = userReqService.getAllUserInfo();
        modelMap.put("getAllUserInfo", list);
        return modelMap;
    }

    /**
     * 获取排行榜
     */
    @RequestMapping(value = "/getRankList", method = RequestMethod.GET)
    private Map<String, Object> getRankList() {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<UserReq> list = new ArrayList<UserReq>();
        list = userReqService.getRankList();
        modelMap.put("getRankList", list);
        return modelMap;
    }
    /**
     * 根据phone获取用户信息
     */
    @RequestMapping(value = "/getUserByPhone", method = RequestMethod.GET)
    private Map<String, Object> getUserByPhone(String telephone) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<UserReq> list = new ArrayList<UserReq>();
        list = userReqService.getUserByPhone(telephone);
        modelMap.put("getUserByPhone", list);
        return modelMap;
    }

    /**
     * 获取所有公司
     */
    @RequestMapping(value = "/getAllCompany", method = RequestMethod.GET)
    private Map<String, Object> getAllCompany() {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<UserReq> list = new ArrayList<UserReq>();
        list = userReqService.getAllCompany();
        modelMap.put("getAllCompany", list);
        return modelMap;
    }

    /**
     * 插入新用户信息
     */
    @RequestMapping(value = "/addUserInfo", method = RequestMethod.POST)
    private Map<String, Object> addUserInfo(@RequestBody UserReq userReq) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("addUserInfo", userReqService.addUserInfo(userReq));
        return modelMap;
    }

    /**
     * 更新点赞信息
     */
    @RequestMapping(value = "/modifyLikeCountByPhone", method = RequestMethod.POST)
    private Map<String, Object> modifyLikeCountByPhone(@RequestBody UserReq userReq) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("modifyLikeCountByPhone", userReqService.modifyLikeCountByPhone(userReq));
        return modelMap;
    }
}

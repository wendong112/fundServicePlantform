package com.tc.fundService.api;

import com.alibaba.fastjson.JSONObject;
import com.tc.fundService.entity.admin.BaseEntity;
import com.tc.fundService.entity.admin.UserReq;
import com.tc.fundService.handler.Const;
import com.tc.fundService.handler.WebUtil;
import com.tc.fundService.service.MyService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * 我的信息模块
 * @version 2.0
 * @author wjg
 */
@RestController
@RequestMapping("/api/my")
public class MyAPI {
    @Autowired
    private MyService myService;

    /**
     * 用户注册
     * @param userReq
     * @return
     */
    @RequestMapping(value = "/userRegister", method = RequestMethod.POST)
    private Map<String, Object> userRegister(@RequestBody UserReq userReq) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("resultInfo", myService.userRegister(userReq));
        return modelMap;
    }

    /**
     * 用户登录
     * @param userReq
     * @return
     */
    @RequestMapping(value = "/userLogin", method = RequestMethod.POST)
    private Map<String, Object> userLogin(@RequestBody UserReq userReq) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("resultInfo", myService.userLogin(userReq));
        return modelMap;
    }

    /**
     * 获取用户信息
     * @param userReq
     * @return
     */
    @RequestMapping(value = "/getUserInfo", method = RequestMethod.POST)
    private Map<String, Object> getUserInfo(@RequestBody UserReq userReq) {
        Map<String, Object> modelMap = new HashMap<String, Object>();

        BaseEntity baseEntity = new BaseEntity();
        baseEntity.setStatus(Const.STATUS_OK);
        baseEntity.setMsg("查询成功！");
        UserReq selectUser = myService.getUserInfo(userReq);
        if(selectUser != null){
            baseEntity.setData(selectUser);
        } else {
            baseEntity.setMsg("查询失败！");
            baseEntity.setStatus(Const.STATUS_ERROR);
        }

        modelMap.put("userInfo", baseEntity);
        return modelMap;
    }

    /**
     * 获取微信号
     * @param resp
     * @param req
     * @return
     */
    @RequestMapping(value = "/toLogin", method = RequestMethod.GET)
    private Map<String, Object> toLogin(HttpServletResponse resp, HttpServletRequest req) {
        String wxLoginUrl = "https://api.weixin.qq.com/sns/jscode2session";
        String appId = "wxc32d9478808c7162";
        String secret = "f511610306c011bb74378082f9c5656b";

        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setContentType("text/html;charset=UTF-8");
        String code = req.getParameter("code");

        String param = "?appid=" + appId + "&secret=" + secret + "&js_code=" + code + "&grant_type=authorization_code";

        Map<String, Object> result = new HashMap<String, Object>();
        int error = 0;

        try {
            String ret = WebUtil.sendGet(wxLoginUrl + param, null);
            System.out.println(ret);
            JSONObject obj = JSONObject.parseObject(ret);
            String openid = obj.getString("openid");
            String session_key = obj.getString("session_key");
            result.put("openid", openid);
            System.out.println("session_key:" + session_key);
        } catch (Exception e) {
            e.printStackTrace();
            error = -1;
        }
        result.put("code", error);
        return result;
    }

    /**
     * 获取消息列表
     *
     * @return
     */
    @RequestMapping(value = "/getInformationList", method = RequestMethod.GET)
    private Map<String, Object> getInformationList() {
        Map<String, Object> modelMap = new HashMap<>();
        modelMap.put("informationList", myService.getAllInformation());
        return modelMap;
    }

    /**
     * 统计消息数量
     * @return
     */
    @RequestMapping(value = "/getInformationCont", method = RequestMethod.GET)
    private Map<String, Object> getInformationCont() {
        Map<String, Object> modelMap = new HashMap<>();
        modelMap.put("informationCont", myService.countInformation());
        return modelMap;
    }

    /**
     * 获取自动化测试升级列表
     *
     * @return
     */
    @RequestMapping(value = "/getUpgradeList", method = RequestMethod.GET)
    private Map<String, Object> getUpgradeList() {
        Map<String, Object> modelMap = new HashMap<>();
        modelMap.put("upgradeMessageList", myService.getAllAutoTestUpgradeMessage());
        return modelMap;
    }
}

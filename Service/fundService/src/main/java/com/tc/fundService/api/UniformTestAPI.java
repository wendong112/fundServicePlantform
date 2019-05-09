package com.tc.fundService.api;

import com.alibaba.fastjson.JSONObject;
import com.tc.fundService.entity.admin.BaseEntity;
import com.tc.fundService.entity.admin.UserReq;
import com.tc.fundService.handler.Const;
import com.tc.fundService.handler.WebUtil;
import com.tc.fundService.service.MyService;
import com.tc.fundService.service.UniformTestService;
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
 * 测试进度模块
 * @version 2.0
 * @author wjg
 */
@RestController
@RequestMapping("/api/uniformTest")
public class UniformTestAPI {
    @Autowired
    private UniformTestService uniformTestService;

    @Autowired
    private MyService myService;

    /**
     * 获取测试进度列表
     *
     * @return
     */
    @RequestMapping(value = "/getUniformTestList", method = RequestMethod.GET)
    private Map<String, Object> getUniformTestList() {
        Map<String, Object> modelMap = new HashMap<>();
        modelMap.put("uniformTestList", uniformTestService.getAllUniformTest());
        return modelMap;
    }

    /**
     * 统计测试进度数量
     * @return
     */
    @RequestMapping(value = "/getUniformTestCont", method = RequestMethod.GET)
    private Map<String, Object> getUniformTestCont() {
        Map<String, Object> modelMap = new HashMap<>();
        modelMap.put("uniformTestCont", uniformTestService.countUniformTest());
        modelMap.put("informationCont", myService.countInformation());
        return modelMap;
    }
}

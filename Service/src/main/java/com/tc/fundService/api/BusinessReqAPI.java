package com.tc.fundService.api;

import com.tc.fundService.entity.admin.BusinessReq;
import com.tc.fundService.service.BusinessReqService;
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
public class BusinessReqAPI {
    @Autowired
    private BusinessReqService businessReqService;

    /**
     * 获取所有的业务需求信息
     */
    @RequestMapping(value = "/getAllBusinessReq", method = RequestMethod.GET)
    private Map<String, Object> getAllBusinessReq() {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<BusinessReq> list = new ArrayList<BusinessReq>();
        list = businessReqService.getAllBusinessReq();
        modelMap.put("allBusinessReq", list);
        return modelMap;
    }

    /**
     * 插入业务需求信息
     */
    @RequestMapping(value = "/addBusinessReq", method = RequestMethod.POST)
    private Map<String, Object> addBusinessReq(@RequestBody BusinessReq businessReq) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("addBusinessReq", businessReqService.addBusinessReq(businessReq));
        return modelMap;
    }

    /**
     * 更新业务需求信息
     */
    @RequestMapping(value = "/modifyBusinessReq", method = RequestMethod.POST)
    private Map<String, Object> modifyBusinessReq(@RequestBody BusinessReq businessReq) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("modifyBusinessReq", businessReqService.modifyBusinessReq(businessReq));
        return modelMap;
    }
}

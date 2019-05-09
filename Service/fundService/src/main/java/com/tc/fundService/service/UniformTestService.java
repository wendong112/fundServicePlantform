package com.tc.fundService.service;

import com.tc.fundService.entity.admin.BaseEntity;
import com.tc.fundService.entity.admin.Information;
import com.tc.fundService.entity.admin.UserReq;

import java.util.List;

/**
 * 测试进度Service
 * @author wjg
 * @version 2.0
 */
public interface UniformTestService {

    /**
     * 获取所有测试进度信息
     * @return
     */
    List<Information> getAllUniformTest();

    /**
     * 统计测试进度信息数量
     * @return
     */
    int countUniformTest();
}

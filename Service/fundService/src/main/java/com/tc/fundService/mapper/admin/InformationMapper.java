package com.tc.fundService.mapper.admin;

import com.tc.fundService.entity.admin.Information;
import com.tc.fundService.entity.admin.UserReq;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * 测试进度、消息
 */
@Component(value = "InformationMapper")
public interface InformationMapper {

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
     * 获取素材列表
     * @return
     */
    List<String> getMaterialList(Information information);
}

package com.tc.fundService.entity.admin;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

/**
 * 测试进度、消息
 *
 * @author wjg
 */
@Setter
@Getter
public class Information {
    private Integer id;     //id
    private String title;  //标题
    private String date;    //日期
    private String content; //内容

    private Integer sourceType;         //源类型 0:uniform_test表; 1:information表
    private List<String> materialList;  //素材列表

}

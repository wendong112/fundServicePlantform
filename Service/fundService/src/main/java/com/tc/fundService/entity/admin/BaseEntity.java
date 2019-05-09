package com.tc.fundService.entity.admin;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * 基础信息
 *
 * @author wjg
 * @version 2.0
 */
public class BaseEntity {

    protected int status;       //状态码
    protected String msg;       //信息
    protected Object data;      //数据

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}

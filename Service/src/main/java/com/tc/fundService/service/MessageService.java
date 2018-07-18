package com.tc.fundService.service;

import com.tc.fundService.entity.defect.Message;

import java.util.List;

public interface MessageService {
    /**
     * 根据缺陷id列出所有留言
     *
     */
    List<Message> getMessageByDefectId(Integer defectId);

    /**
     * 插入新留言
     *
     */
    boolean addMessage(Message message);

}

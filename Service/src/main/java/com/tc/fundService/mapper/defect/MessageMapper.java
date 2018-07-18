package com.tc.fundService.mapper.defect;

import com.tc.fundService.entity.defect.Message;

import java.util.List;

public interface MessageMapper {

    /**
     * 根据缺陷id列出所有留言
     *
     * @param defectId
     */
    List<Message> getMessageByDefectId(Integer defectId);

    /**
     * 插入新留言
     *
     * @param message
     */
    int addMessage(Message message);
}

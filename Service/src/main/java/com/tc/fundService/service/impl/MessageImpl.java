package com.tc.fundService.service.impl;

import com.tc.fundService.entity.defect.Message;
import com.tc.fundService.mapper.defect.MessageMapper;
import com.tc.fundService.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageImpl implements MessageService {
    @Autowired
    private MessageMapper messageMapper;

    @Override
    public List<Message> getMessageByDefectId(Integer defectId) {
        return messageMapper.getMessageByDefectId(defectId);
    }

    @Override
    public boolean addMessage(Message message) {
        try {
            int effectedNum = messageMapper.addMessage(message);
            if (effectedNum > 0) {
                return true;
            } else {
                throw new RuntimeException("插入新留言失败！");
            }
        } catch (Exception e) {
            throw new RuntimeException("插入新留言失败:" + e.getMessage());
        }
    }
}

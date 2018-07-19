package com.tc.fundService.api;

import com.tc.fundService.entity.admin.Message;
import com.tc.fundService.service.MessageService;
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
public class MessageAPI {
    @Autowired
    private MessageService messageService;
    /**
     * 获取所有版本
     */
    @RequestMapping(value = "/getMessageByDefectId", method = RequestMethod.GET)
    private Map<String, Object> getMessageByDefectId(Integer defectId) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<Message> list = new ArrayList<Message>();
        list = messageService.getMessageByDefectId(defectId);
        modelMap.put("getMessageByDefectId", list);
        return modelMap;
    }

    /**
     * 插入新留言
     */
    @RequestMapping(value = "/addMessage", method = RequestMethod.POST)
    private Map<String, Object> addMessage(@RequestBody Message message) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("addMessage", messageService.addMessage(message));
        return modelMap;
    }
}

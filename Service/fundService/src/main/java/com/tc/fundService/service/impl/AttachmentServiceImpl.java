package com.tc.fundService.service.impl;

import java.util.List;

import com.tc.fundService.entity.defect.Attachment;
import com.tc.fundService.mapper.defect.AttachmentMapper;
import com.tc.fundService.service.AttachmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * 附件Service实现
 * @author yinbo
 */
@Service
@Transactional(readOnly = false)
public class AttachmentServiceImpl implements AttachmentService {

	@Autowired
	private AttachmentMapper attachmentMapper;


	@Override
	public List<Attachment> listAllAttachmentsByNodeId(Attachment attachment) {
		return attachmentMapper.listAllAttachmentsByNodeId(attachment);
	}

	@Override
	public int add(Attachment attachment) {
		attachmentMapper.add(attachment);
		return attachment.getId();
	}

	@Override
	public void deleteAttachmentById(Integer id) {

	}
}

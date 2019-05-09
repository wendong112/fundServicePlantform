package com.tc.fundService.service;

import com.tc.fundService.entity.defect.Attachment;

import java.util.List;

/**
 * 附件Service
 * @author wjg
 */
public interface AttachmentService {
	
	/**
	 * 根据moduleId和nodeId获取所有的附件
	 * @param attachment
	 * @return
	 */
	public List<Attachment> listAllAttachmentsByNodeId(Attachment attachment);


	/**
	 * 新增附件
	 * @param attachment
	 */
	public int add(Attachment attachment);

	/**
	 * 根据id删除附件
	 * @param
	 */
	public void deleteAttachmentById(Integer id);
}

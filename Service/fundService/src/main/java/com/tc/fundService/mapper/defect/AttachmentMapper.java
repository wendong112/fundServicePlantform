package com.tc.fundService.mapper.defect;

import com.tc.fundService.entity.defect.Attachment;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * 附件Mapper
 * @author wjg
 *
 */
@Component(value = "AttachmentMapper")
public interface AttachmentMapper {

	/**
	 * 根据moduleId和nodeId和projectId获取所有的附件
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
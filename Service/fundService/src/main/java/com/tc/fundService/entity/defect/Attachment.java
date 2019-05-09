package com.tc.fundService.entity.defect;

import lombok.Getter;
import lombok.Setter;

/**
 * 附件entity
 * @author wjg
 *
 */
@Setter
@Getter
public class Attachment {
	private Integer id;// id号
	private String name;// 附件名称
	private String fileName;// 文件名称
	private Integer projectId;// 工程id
	private String attachmentPath;// 附件路径
	private String description;// 附件描述
	private Integer nodeId;// 模块下相应功能id
	private Integer moduleId;// 模块id
	private String uploadTime;//上传时间
	private String fileSize;//文件大小
	private String isMain;//"Y"文件的   "N"列表的
	private Integer uploadUserId;//上传人id
	private String uploadUserName;//上传人name
}

package com.tc.fundService.api;

import com.tc.fundService.entity.defect.Attachment;
import com.tc.fundService.service.AttachmentService;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.HashMap;
import java.util.Map;

/**
 * 我的信息模块
 * @version 2.0
 * @author wjg
 */
@RestController
@RequestMapping("/api/attachment")
public class AttachmentAPI {

    @Value("${file_upload_path}") private String fileUploadPath;

    @Autowired
    private AttachmentService attachmentService;

    /**
     * 文件上传
     * @param request
     * @param files
     * @return
     */
    @RequestMapping(value = "/uploadAttachment", method = RequestMethod.POST)
    private Map<String, Object> uploadAttachment(HttpServletRequest request, @RequestParam("attachments")MultipartFile[] files) {
        String defectId = request.getParameter("defectId");     //缺陷id
        String type = request.getParameter("type");         //文件类型
        int imageNum;         //图片编号
        String saveFilePath;    //文件存放位置

        //多文件上传
        if(files!=null && files.length>=1) {
            for (int i = 0; i < files.length; i++){
                try {
                    String fileName = files[i].getOriginalFilename();
                    System.out.println("保存上传文件：" + fileName);
                    //判断是否有文件
                    if(StringUtils.isNoneBlank(fileName)) {
                        String fileType = fileName.substring(fileName.lastIndexOf("."));
                        String saveFileName;

                        //将文件保存到上传目录
                        if("0".equals(type)){
                            imageNum = Integer.parseInt(request.getParameter("imageNum"));
                            saveFileName = "defectImage_" + imageNum + fileType;
                        } else {
                            saveFileName = "defectRecord" + fileType;
                        }

                        //拷贝文件到MTF目录
                        Attachment attachment = new Attachment();
                        attachment.setName(saveFileName);
                        attachment.setProjectId(9);
                        attachment.setNodeId(Integer.parseInt(defectId));
                        attachment.setAttachmentPath("/upload/9");
                        attachment.setModuleId(12);
                        attachment.setFileSize(FileUtils.byteCountToDisplaySize(files[i].getSize()));
                        attachment.setIsMain("Y");
                        attachment.setUploadUserId(74);

                        int attachmentId = attachmentService.add(attachment);

                        saveFileName = attachmentId + "_" + saveFileName;
//                        File outFile = new File(saveFilePath + UUID.randomUUID().toString() + fileType);
                        File outFile = new File(fileUploadPath + File.separator + saveFileName);
                        //拷贝文件到输出文件对象
                        FileUtils.copyInputStreamToFile(files[i].getInputStream(), outFile);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {

                }
            }
        }

        Map<String, Object> modelMap = new HashMap<>();
        modelMap.put("result", "success");
        return modelMap;
    }

}

package com.tc.fundService.service.impl;

import com.tc.fundService.entity.admin.BaseEntity;
import com.tc.fundService.entity.admin.DefectBriefReq;
import com.tc.fundService.entity.admin.DefectDetail;
import com.tc.fundService.entity.defect.Attachment;
import com.tc.fundService.handler.Const;
import com.tc.fundService.handler.FileUtil;
import com.tc.fundService.mapper.admin.DefectDetailMapper;
import com.tc.fundService.mapper.defect.AttachmentMapper;
import com.tc.fundService.mapper.defect.MTFDefectDetailMapper;
import com.tc.fundService.service.DefectDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Service
public class DefectDetailImpl implements DefectDetailService {
    @Autowired
    private DefectDetailMapper defectDetailMapper;

    @Autowired
    private MTFDefectDetailMapper mtfDefectDetailMapper;

    @Autowired
    private AttachmentMapper attachmentMapper;

    @Value("${file_upload_path}") private String fileUploadPath;

    @Value("${material_path}") private String materialPath;

    @Value("${service_url}") private String serviceUrl;

    public DefectDetail getDefectById(DefectBriefReq defectBriefReq) {
        DefectDetail defectDetail = mtfDefectDetailMapper.getMTFDefectById(defectBriefReq);

        //获取缺陷图片列表
        Attachment attachment = new Attachment();
        attachment.setProjectId(9);
        attachment.setModuleId(12);
        attachment.setNodeId(defectBriefReq.getId());

        List<Attachment> attachmentList = attachmentMapper.listAllAttachmentsByNodeId(attachment);

        //查找缺陷附件
        List<String> materialList = new ArrayList<>();
        if (!attachmentList.isEmpty()) {
            for (Attachment att : attachmentList) {
                if(null!=attachment.getProjectId()){
                    File fileDir = new File(fileUploadPath);
                    if (fileDir.exists()) {
                        File[] files = fileDir.listFiles();
                        for (File eachFile : files) {
                            String fileName = eachFile.getName();
                            if (fileName.split("_")[0].equals(String.valueOf(att.getId()))) {
                                if(defectBriefReq.getPlatform() == 0){  //MTF提交的缺陷
                                    if(FileUtil.isContainChinese(fileName)){    //过滤中文名称文件
                                        continue;
                                    }

                                    if(fileName.indexOf(".jpg") != -1 || fileName.indexOf(".bmp") != -1
                                            || fileName.indexOf(".png") != -1 || fileName.indexOf(".JPG") != -1 || fileName.indexOf(".BMP") != -1
                                            || fileName.indexOf(".PNG") != -1){

                                    } else {
                                        continue;
                                    }
                                } else {    //小程序提交的缺陷
                                    //跳过语音文件
                                    if(fileName.indexOf(".m4a") != -1){
                                        continue;
                                    }
                                }

                                //拼接完整web路径
                                String materialWebPath = fileUploadPath + File.separator + fileName;
                                materialWebPath = materialWebPath.substring(materialPath.length());
                                materialWebPath = serviceUrl + materialWebPath.replaceAll("\\\\","/");
                                materialList.add(materialWebPath);
                            }
                        }
                    }
                }
            }

            if(materialList.size() > 0){
                defectDetail.setMaterialList(materialList);
            }
        }

        return defectDetail;
    }

    @Override
    public BaseEntity addNewDefect(DefectDetail defectDetail) {
        BaseEntity resultEntity = new BaseEntity();
        resultEntity.setStatus(Const.STATUS_OK);
        resultEntity.setMsg("缺陷提交成功！");

        try {
            defectDetail.setProjectId(9);
            defectDetail.setModuleId(12);
            defectDetail.setCreatedUserId(74);
            defectDetail.setStatusId(1);
            defectDetail.setReproducible("是");
            defectDetail.setUserFlagMap("{\"Creater\":\"wechat\"}");
            int effectedNum = mtfDefectDetailMapper.addNewDefect(defectDetail);
            if (effectedNum > 0) {
                resultEntity.setData(defectDetail);
            } else {
                resultEntity.setMsg("插入新缺陷失败！");
                throw new RuntimeException("插入新缺陷失败！");
            }
        } catch (Exception e) {
            resultEntity.setMsg("插入新缺陷失败！");
            throw new RuntimeException("插入新缺陷失败:" + e.getMessage());
        }
        return resultEntity;
    }

    @Override
    public boolean modifyDefectById(DefectDetail defectDetail) {
        try {
            int effectedNum = defectDetailMapper.modifyDefectById(defectDetail);
            if (effectedNum > 0) {
                return true;
            } else {
                throw new RuntimeException("修改缺陷失败！");
            }
        } catch (Exception e) {
            throw new RuntimeException("修改缺陷失败:" + e.getMessage());
        }
    }
}

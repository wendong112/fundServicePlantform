package com.tc.fundService.api;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;


@RestController
@RequestMapping("/api")
public class TransferAPI {
    public String uploadPath = "C:\\fund\\fundServiceFile\\defectImageView\\";
    public String reqPath = "C:\\fund\\fundServiceFile\\businessReqDownLoad\\";
    public String uniformPath = "C:\\fund\\fundServiceFile\\uniformTest\\";
    @ResponseBody
    @RequestMapping(value = "/uploadImage")
    public String upload(HttpServletRequest request, @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        System.out.println("执行upload");
        request.setCharacterEncoding("UTF-8");
        System.out.println("执行图片上传");
        String folderName = request.getParameter("folderName");
        System.out.println("folderName:" + folderName);
        String trueFileName = request.getParameter("trueFileName");
        System.out.println("trueFileName:" + trueFileName);

        // 创建文件夹
        String storeFolder = uploadPath + folderName + "//";
        File folderFile = new File(storeFolder);
        if  (!folderFile.exists()  && !folderFile.isDirectory()) {
            System.out.println(storeFolder + "不存在");
            folderFile.mkdir();
        } else {
            System.out.println(storeFolder + "目录存在");
        }

        // 存储图片
        if(!file.isEmpty()) {
            System.out.println("成功获取照片");
            String fileName = file.getOriginalFilename();
            String path = null;
            String type = null;
            type = fileName.indexOf(".") != -1 ? fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length()) : null;
            System.out.println("图片初始名称为：" + fileName + " 类型为：" + type);

            if (type != null) {
                if ("PNG".equals(type.toUpperCase())||"JPG".equals(type.toUpperCase())) {
                    // 设置存放图片文件的路径
                    path = storeFolder + trueFileName;
                    System.out.println("存放图片文件的路径:" + path);
                    file.transferTo(new File(path));
                    System.out.println("文件成功上传到指定目录下");
                }else {
                    System.out.println("不是我们想要的文件类型,请按要求重新上传");
                    return "error";
                }
            }else {
                System.out.println("文件类型为空");
                return "error";
            }
        }else {
            System.out.println("没有找到相对应的文件");
            return "error";
        }
        return "success";
    }
     /**
     * 下载文件
     */
    @RequestMapping(value = "/downloadFile", method = RequestMethod.GET)
    public String downloadImage(String fileName, HttpServletRequest request, HttpServletResponse response) {
//        String fileUrl = downloadPath + fileName;
        String ext = fileName.split("\\.")[1];
        String contentType = "";
        String fileUrl = "";
        if (ext.equals("pdf")) {
            fileUrl = reqPath + fileName;
            contentType = "application/pdf";
        }

        if (ext.equals("doc")) {
            fileUrl = uniformPath + fileName;
            contentType = "application/msword";
        }

        if (fileUrl != null) {
            File file = new File(fileUrl);
            if (file.exists()) {
//                response.setContentType("application/vnd.openxmlformats-officedocument.wordprocessingml.document");
                response.setContentType(contentType);
                response.addHeader("Content-Disposition",
                        "attachment;fileName=" + fileName);
                byte[] buffer = new byte[1024];
                FileInputStream fis = null;
                BufferedInputStream bis = null;
                try {
                    fis = new FileInputStream(file);
                    bis = new BufferedInputStream(fis);
                    OutputStream os = response.getOutputStream();
                    int i = bis.read(buffer);
                    while (i != -1) {
                        os.write(buffer, 0, i);
                        i = bis.read(buffer);
                    }
                    System.out.println("success");
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    if (bis != null) {
                        try {
                            bis.close();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                    if (fis != null) {
                        try {
                            fis.close();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
        }
        return null;
    }
}

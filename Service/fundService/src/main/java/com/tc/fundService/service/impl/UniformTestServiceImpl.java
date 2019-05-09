package com.tc.fundService.service.impl;

import com.tc.fundService.entity.admin.BaseEntity;
import com.tc.fundService.entity.admin.Information;
import com.tc.fundService.entity.admin.UserReq;
import com.tc.fundService.handler.Const;
import com.tc.fundService.mapper.admin.InformationMapper;
import com.tc.fundService.mapper.admin.MyMapper;
import com.tc.fundService.service.MyService;
import com.tc.fundService.service.UniformTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UniformTestServiceImpl implements UniformTestService {

    @Autowired
    private InformationMapper informationMapper;

    @Value("${material_path}") private String materialPath;
    @Value("${service_url}") private String serviceUrl;

    @Override
    public List<Information> getAllUniformTest() {
        List<Information> informationList = informationMapper.getAllUniformTest();
        if(!informationList.isEmpty()){
            for (int i = 0; i < informationList.size(); i++) {
                informationList.get(i).setSourceType(0);
                List<String> list = informationMapper.getMaterialList(informationList.get(i));
                if(!list.isEmpty()){
                    for(int j = 0; j < list.size(); j++){
                        //拼接完整web路径
                        String newPath = list.get(j).substring(materialPath.length());
                        newPath = serviceUrl + newPath.replaceAll("\\\\","/");
                        list.set(j, newPath);
                    }
                    informationList.get(i).setMaterialList(list);
                }
            }
        }

        return informationList;
    }

    @Override
    public int countUniformTest() {
        return informationMapper.countUniformTest();
    }
}

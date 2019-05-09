package com.tc.fundService.service.impl;

import com.tc.fundService.entity.admin.AutoTestUpgrade;
import com.tc.fundService.entity.admin.BaseEntity;
import com.tc.fundService.entity.admin.Information;
import com.tc.fundService.entity.admin.UserReq;
import com.tc.fundService.handler.Const;
import com.tc.fundService.mapper.admin.InformationMapper;
import com.tc.fundService.mapper.admin.MyMapper;
import com.tc.fundService.service.MyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MyServiceImpl implements MyService {

    @Autowired
    private MyMapper myMapper;

    @Autowired
    private InformationMapper informationMapper;

    @Value("${material_path}") private String materialPath;
    @Value("${service_url}") private String serviceUrl;

    public BaseEntity userRegister(UserReq userReq) {
        BaseEntity baseEntity = new BaseEntity();
        baseEntity.setStatus(Const.STATUS_OK);
        baseEntity.setMsg("注册成功");

        //检查用户是否注册
        UserReq selectUser = myMapper.getUserInfo(userReq);
        System.out.println(selectUser);
        if(selectUser != null){
            baseEntity.setStatus(Const.STATUS_ERROR);
            baseEntity.setMsg("您已注册！");
        } else {
            //检查手机号
            UserReq user = myMapper.getUserInfoByTelephone(userReq);
            if(user != null){
                baseEntity.setStatus(Const.STATUS_ERROR);
                baseEntity.setMsg("该手机号已被注册！");
            } else {
                int result = 0;
                try {
                    result = myMapper.addUserInfo(userReq);
                } catch (Exception e) {
                    baseEntity.setStatus(Const.STATUS_ERROR);
                    baseEntity.setMsg(e.getMessage());
                    return baseEntity;
                }

                if(result <= 0){
                    baseEntity.setStatus(Const.STATUS_ERROR);
                    baseEntity.setMsg("注册失败");
                }
            }
        }

        return baseEntity;
    }

    public UserReq getUserInfo(UserReq userReq) {
        return  myMapper.getUserInfo(userReq);
    }


    public BaseEntity userLogin(UserReq userReq) {
        BaseEntity baseEntity = new BaseEntity();
        baseEntity.setStatus(Const.STATUS_OK);
        baseEntity.setMsg("登录成功");

        UserReq selectUser = myMapper.getUserInfo(userReq);
        if(selectUser != null){
            if(!selectUser.getTelephone().equals(userReq.getTelephone())){
                baseEntity.setStatus(Const.STATUS_ERROR);
                baseEntity.setMsg("手机号错误");
            } else {
                baseEntity.setData(selectUser);
            }
        } else {
            baseEntity.setStatus(Const.STATUS_ERROR);
            baseEntity.setMsg("用户未注册");
        }

        return baseEntity;
    }

    @Override
    public List<Information> getAllInformation() {
        List<Information> informationList = informationMapper.getAllInformation();
        if(!informationList.isEmpty()){
            for (int i = 0; i < informationList.size(); i++) {
                informationList.get(i).setSourceType(1);
                List<String> list;
                try{
                    list = informationMapper.getMaterialList(informationList.get(i));
                    if(!list.isEmpty()){
                        for(int j = 0; j < list.size(); j++){
                            String newPath = list.get(j).substring(materialPath.length());
                            newPath = serviceUrl + newPath.replaceAll("\\\\","/");
                            list.set(j, newPath);
                        }
                        informationList.get(i).setMaterialList(list);
                    }
                } catch(Exception e){
                    e.printStackTrace();
                }


            }
        }

        return informationList;
    }

    @Override
    public int countInformation() {
        return informationMapper.countInformation();
    }

    @Override
    public List<AutoTestUpgrade> getAllAutoTestUpgradeMessage() {
        return myMapper.getAllAutoTestUpgradeMessage();
    }
}

package com.tc.fundService.api;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.tc.fundService.entity.defect.Defect;
import com.tc.fundService.service.DefectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/api")
public class DefectAPI {
    @Autowired
    private DefectService defectService;

    @RequestMapping(value = "/hello", method = RequestMethod.GET)
    private String Hello() {
        return "hello world";
    }

    /**
     * 获取所有的缺陷信息
     *
     * @return
     */
    @RequestMapping(value = "/listdefect", method = RequestMethod.GET)
    private Map<String, Object> listDefect() {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<Defect> list = new ArrayList<Defect>();
        // 获取缺陷列表
        list = defectService.getDefectList();

        defectNumberToStrConverter(list);

        modelMap.put("defectList", list);
        return modelMap;
    }

    /**
     * 通过缺陷Id获取缺陷信息
     *
     * @return
     */
    @RequestMapping(value = "/getdefectbyid", method = RequestMethod.GET)
    private Map<String, Object> getDefectById(Integer id) {

        Map<String, Object> modelMap = new HashMap<String, Object>();
        // 获取缺陷信息
        Defect defect = defectService.getDefectById(id);

        if (defect != null) {
            defectSeverityNumberToStrConverter(defect);
            if (defect.getStatusId() != null && !"".equals(defect.getStatusId())) {
                if (defect.getStatusId() == 1) {
                    defect.setStatusIdName("新建");
                }
            }

            //获取一级模块的名字，经过对应的数据库里的ID进行对应转换
            if (defect.getPriorityId() != null) {
                if (defect.getPriorityId() == 241) {
                    defect.setFirstLevelModulePriorityIdName("风险控制");
                }
                if (defect.getPriorityId() == 242) {
                    defect.setFirstLevelModulePriorityIdName("基金财务");
                }
                if (defect.getPriorityId() == 243) {
                    defect.setFirstLevelModulePriorityIdName("交易管理");
                }
                if (defect.getPriorityId() == 244) {
                    defect.setFirstLevelModulePriorityIdName("日终清算");
                }
                if (defect.getPriorityId() == 245) {
                    defect.setFirstLevelModulePriorityIdName("投资决策");
                }
                if (defect.getPriorityId() == 246) {
                    defect.setFirstLevelModulePriorityIdName("系统管理");
                }
                if (defect.getPriorityId() == 247) {
                    defect.setFirstLevelModulePriorityIdName("信息查询");
                }
                if (defect.getPriorityId() == 248) {
                    defect.setFirstLevelModulePriorityIdName("指令管理");
                }
                if (defect.getPriorityId() == 249) {
                    defect.setFirstLevelModulePriorityIdName("转换机");
                }
                if (defect.getPriorityId() == 352) {
                    defect.setFirstLevelModulePriorityIdName("文档类");
                }
                if (defect.getPriorityId() == 392) {
                    defect.setFirstLevelModulePriorityIdName("系统级");
                }
            }

            //为前端显示准备如下字段值：前提条件，重现步骤，预期结果，实际结果
            if (defect.getDefectDescription() != null && !"".equals(defect.getDefectDescription())) {

                String temStrOfDefectDescription = defect.getDefectDescription();
                String[] strArray = temStrOfDefectDescription.split("\\n");

                if (strArray.length > 4 && strArray.length <= 10) {

                    defect.setPreCondition(strArray[3].trim());

                    if (strArray.length > 6) {
                        defect.setReoccurSteps(strArray[5].trim());
                    }
                    if (strArray.length > 8) {
                        defect.setActualResult(strArray[7].trim());
                    }
                    if (strArray.length == 10) {
                        defect.setExpectedResult(strArray[9].trim());
                    }
                }

            }
        }

        modelMap.put("defect", defect);
        return modelMap;
    }


    /**
     * 通过缺陷严重度severityId获取缺陷信息
     *
     * @return
     */
    @RequestMapping(value = "/getdefectbyseverityid", method = RequestMethod.GET)
    private Map<String, Object> getDefectBySeverityId(Integer severityId) {

        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<Defect> list = new ArrayList<Defect>();

        // 获取缺陷信息
        list = defectService.getDefectBySeverityId(severityId);

        defectNumberToStrConverter(list);


        modelMap.put("defectList", list);
        return modelMap;

    }

    private void defectNumberToStrConverter(List<Defect> list) {

        for (int i = 0; i < list.size(); i++) {

            Defect defect = new Defect();
            defect = list.get(i);
            if (defect.getSeverityID() != null && !"".equals(defect.getSeverityID())) {
                defectSeverityNumberToStrConverter(defect);
            }
            if (defect.getStatusId() != null && !"".equals(defect.getStatusId())) {
                if (defect.getStatusId() == 1) {
                    defect.setStatusIdName("新建");
                }
            }
            if (defect.getCreatedDate() != null && !"".equals(defect.getCreatedDate())) {
                Date dateOfCreate = defect.getCreatedDate();
                SimpleDateFormat form = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                form.format(dateOfCreate);
                defect.setCreatedDate(dateOfCreate);

            }

        }
    }

    private void defectSeverityNumberToStrConverter(Defect defect) {

//        if(defect.getSeverityID()==13){
//            defect.setSeverity("1-改善建议");
//        }

        //根据数据库里的严重度数值，设定前端页面的显示实际值。
        int severityID = defect.getSeverityID();
        switch (severityID) {
            case 13:
                defect.setSeverity("改善建议"); //defect.setSeverity("改善");
                break;
            case 14:
                defect.setSeverity("轻微问题");  // defect.setSeverity("轻微");
                break;
            case 15:
                defect.setSeverity("一般问题");  //defect.setSeverity("一般");
                break;
            case 16:
                defect.setSeverity("严重问题");  //defect.setSeverity("严重");
                break;
            default:
                defect.setSeverity("致命问题");  //defect.setSeverity("致命");
        }
    }


    /**
     * 添加缺陷信息
     *
     * @param defect
     * @return
     * @throws IOException
     * @throws JsonMappingException
     * @throws JsonParseException
     */
    @RequestMapping(value = "/adddefect", method = RequestMethod.POST)
    private Map<String, Object> addDefect(@RequestBody Defect defect)
            throws JsonParseException, JsonMappingException, IOException {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        // 添加缺陷信息
        modelMap.put("success", defectService.addDefect(defect));
        return modelMap;
    }

    /**
     * 修改缺陷信息
     *
     * @param defect
     */
    @RequestMapping(value = "/modifydefect", method = RequestMethod.POST)
    private Map<String, Object> modifyDefect(@RequestBody Defect defect)
            throws JsonParseException, JsonMappingException, IOException {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        // 修改缺陷信息
        final Object success = modelMap.put("success", defectService.modifyDefect(defect));
        return modelMap;
    }

    @RequestMapping(value = "/removedefect", method = RequestMethod.GET)
    private Map<String, Object> removeDefect(Integer id) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        // 删除缺陷信息
        modelMap.put("success", defectService.deleteDefect(id));
        return modelMap;
    }

}

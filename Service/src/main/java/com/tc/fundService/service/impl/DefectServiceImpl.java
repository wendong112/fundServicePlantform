package com.tc.fundService.service.impl;

import com.tc.fundService.entity.defect.Defect;
import com.tc.fundService.mapper.defect.DefectMapper;
import com.tc.fundService.service.DefectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
public class DefectServiceImpl implements DefectService {
    @Autowired
    private DefectMapper defectMapper;

    @Override
    public List<Defect> getDefectList() {
        return defectMapper.queryDefect();
    }

    @Override
    public Defect getDefectById(int id) {
        return defectMapper.queryDefectById(id);
    }


    @Override
    public List<Defect> getDefectBySeverityId(int severityId) {
        return defectMapper.queryDefectBySeverityId(severityId);
    }


    @Transactional
    @Override
    public boolean addDefect(Defect defect) {
        if (defect.getTitle() != null && !"".equals(defect.getTitle())) {

            defect.setCreatedDate(new Date());

            if (defect.getFindVersion() != null && !"".equals(defect.getFindVersion())) {
                if ("20160122X".equals(defect.getFindVersion())) {
                    defect.setFindVersionID(406);
                }
                if ("20160122G_23".equals(defect.getFindVersion())) {
                    defect.setFindVersionID(402);
                }
                if ("20160122H_19".equals(defect.getFindVersion())) {
                    defect.setFindVersionID(405);
                }
                if ("20160122H_9".equals(defect.getFindVersion())) {
                    defect.setFindVersionID(404);
                }
            }

            if (defect.getFirstLevelModulePriorityIdName() != null && !"".equals(defect.getFirstLevelModulePriorityIdName())) {
                if ("风险控制".equals(defect.getFirstLevelModulePriorityIdName())) {
                    defect.setPriorityId(241);
                }
                if ("基金财务".equals(defect.getFirstLevelModulePriorityIdName())) {
                    defect.setPriorityId(242);
                }
                if ("交易管理".equals(defect.getFirstLevelModulePriorityIdName())) {
                    defect.setPriorityId(243);
                }
                if ("日终清算".equals(defect.getFirstLevelModulePriorityIdName())) {
                    defect.setPriorityId(244);
                }
                if ("投资决策".equals(defect.getFirstLevelModulePriorityIdName())) {
                    defect.setPriorityId(245);
                }
                if ("系统管理".equals(defect.getFirstLevelModulePriorityIdName())) {
                    defect.setPriorityId(246);
                }
                if ("信息查询".equals(defect.getFirstLevelModulePriorityIdName())) {
                    defect.setPriorityId(247);
                }
                if ("指令管理".equals(defect.getFirstLevelModulePriorityIdName())) {
                    defect.setPriorityId(248);
                }
                if ("转换机".equals(defect.getFirstLevelModulePriorityIdName())) {
                    defect.setPriorityId(249);
                }
                if ("文档类".equals(defect.getFirstLevelModulePriorityIdName())) {
                    defect.setPriorityId(352);
                }
                if ("系统级".equals(defect.getFirstLevelModulePriorityIdName())) {
                    defect.setPriorityId(392);
                }
            }

            if (defect.getSeverity() != null && !"".equals(defect.getSeverity())) {
                if ("1-改善建议".equals(defect.getSeverity())) {
                    defect.setSeverityID(13);
                }
                if ("2-轻微问题".equals(defect.getSeverity())) {
                    defect.setSeverityID(14);
                }
                if ("3-一般问题".equals(defect.getSeverity())) {
                    defect.setSeverityID(15);
                }
                if ("4-严重问题".equals(defect.getSeverity())) {
                    defect.setSeverityID(16);
                }
                if ("5-致命问题".equals(defect.getSeverity())) {
                    defect.setSeverityID(17);
                }
            }

            //用缺陷概述和前提条件，重现步骤，实际结果，期望结果，备注合成一个字段做为详细缺陷信息插入数据库。
            String defectDetailsInfo;

            StringBuffer tempStr = new StringBuffer();

            tempStr = tempStr.append("错误描述：\r").append(defect.getTitle()).append("\r");

            if (defect.getPreCondition() != null && !"".equals(defect.getPreCondition())) {
                tempStr.append("前提条件：\r").append(defect.getPreCondition()).append("\r");
            }
            if (defect.getReoccurSteps() != null && !"".equals(defect.getReoccurSteps())) {
                tempStr.append("重现步骤：\r").append(defect.getReoccurSteps()).append("\r");
            }
            if (defect.getActualResult() != null && !"".equals(defect.getActualResult())) {
                tempStr.append("实际结果：\r").append(defect.getActualResult()).append("\r");
            }
            if (defect.getExpectedResult() != null && !"".equals(defect.getExpectedResult())) {
                tempStr.append("期望结果：\r").append(defect.getExpectedResult()).append("\r");
            }
            if (defect.getDefectNote() != null && !"".equals(defect.getDefectNote())) {
                tempStr.append("备注：\r").append(defect.getDefectNote()).append("\r");
            }
            //合成缺陷详细信息完成
            defectDetailsInfo = tempStr.toString();

            defect.setDefectDescription(defectDetailsInfo);

            try {
                int effectedNum = defectMapper.insertDefect(defect);
                if (effectedNum > 0) {
                    return true;
                } else {
                    throw new RuntimeException("插入缺陷信息失败！");
                }
            } catch (Exception e) {
                throw new RuntimeException("插入缺陷信息失败:" + e.getMessage());
            }
        } else {
            throw new RuntimeException("缺陷Title信息不能为空！");
        }
    }

    @Transactional
    @Override
    public boolean modifyDefect(Defect defect) {
        // 空值判断，主要是缺陷id不为空
        if (defect.getId() != null && defect.getId() > 0) {
            // 设置默认值
            defect.setModifiedDate(new Date());
            try {
                // 更新区域信息
                int effectedNum = defectMapper.updateDefect(defect);
                if (effectedNum > 0) {
                    return true;
                } else {
                    throw new RuntimeException("更新缺陷信息失败!");
                }
            } catch (Exception e) {
                throw new RuntimeException("更新缺陷信息失败:" + e.toString());
            }
        } else {
            throw new RuntimeException("缺陷信息不能为空！");
        }
    }

    @Transactional
    @Override
    public boolean deleteDefect(int id) {
        {
            if (id > 0) {
                try {
                    // 删除缺陷信息
                    int effectedNum = defectMapper.deleteDefect(id);
                    if (effectedNum > 0) {
                        return true;
                    } else {
                        throw new RuntimeException("删除区域信息失败!");
                    }
                } catch (Exception e) {
                    throw new RuntimeException("删除区域信息失败:" + e.toString());
                }
            } else {
                throw new RuntimeException("区域Id不能为空！");
            }
        }
    }
}

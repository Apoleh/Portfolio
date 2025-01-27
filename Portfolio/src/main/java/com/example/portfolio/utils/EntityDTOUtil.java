package com.example.portfolio.utils;


import com.example.portfolio.FelixSubdomain.DataLayer.Felix;
import com.example.portfolio.FelixSubdomain.PresentationLayer.FelixResponseModel;
import com.example.portfolio.ProjectSubdomain.DataLayer.Project;
import com.example.portfolio.ProjectSubdomain.PresentationLayer.ProjectRequestModel;
import com.example.portfolio.ProjectSubdomain.PresentationLayer.ProjectResponseModel;
import com.example.portfolio.SkillsSubdomain.DataLayer.Skill;
import com.example.portfolio.SkillsSubdomain.PresentationLayer.SkillResponseModel;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class EntityDTOUtil {


    public static FelixResponseModel toZakoResponseDTO(Felix zako) {
        FelixResponseModel felixResponseModel = new FelixResponseModel();
        BeanUtils.copyProperties(zako, felixResponseModel);
        return felixResponseModel;
    }


    public static SkillResponseModel toSkillResponseModel(Skill skill) {
        SkillResponseModel skillResponseModel  = new SkillResponseModel();
        BeanUtils.copyProperties(skill, skillResponseModel);
        return skillResponseModel;
    }

    public static ProjectResponseModel toProjectResponseModel(Project project) {
        ProjectResponseModel projectResponseModel  = new ProjectResponseModel();
        BeanUtils.copyProperties(project, projectResponseModel);
        return projectResponseModel;
    }


    public static Project toProjectEntity(ProjectRequestModel projectRequestModel){
        return Project.builder()
                .projectId(generateOrderIdString())
                .projectName(projectRequestModel.getProjectName())
                .description(projectRequestModel.getDescription())
                .imageUrl(projectRequestModel.getImageUrl())
                .skills(projectRequestModel.getSkills())
                .build();
    }


    public static String generateOrderIdString() {
        return UUID.randomUUID().toString();
    }
}

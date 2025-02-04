package com.example.portfolio.ProjectSubdomain.PresentationLayer;

import com.example.portfolio.SkillsSubdomain.DataLayer.Skill;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectRequestModel {
    String projectName;
    String description;
    String imageUrl;
    List<Skill> skills;
    String projectLink;
}

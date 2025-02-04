package com.example.portfolio.ProjectSubdomain.DataLayer;

import com.example.portfolio.SkillsSubdomain.DataLayer.Skill;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Project {
    @Id
    private String id;
    private String projectId;
    private String projectName;
    private String description;
    private String imageUrl;
    private List<Skill> skills;
    private String projectLink;
}

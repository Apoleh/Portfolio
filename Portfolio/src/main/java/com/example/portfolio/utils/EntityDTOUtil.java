package com.example.portfolio.utils;


import com.example.portfolio.CommentsSubdomain.DataLayer.Comment;
import com.example.portfolio.CommentsSubdomain.PresentationLayer.CommentRequestModel;
import com.example.portfolio.CommentsSubdomain.PresentationLayer.CommentResponseModel;
import com.example.portfolio.FelixSubdomain.DataLayer.Felix;
import com.example.portfolio.FelixSubdomain.PresentationLayer.FelixRequestModel;
import com.example.portfolio.FelixSubdomain.PresentationLayer.FelixResponseModel;
import com.example.portfolio.ProjectSubdomain.DataLayer.Project;
import com.example.portfolio.ProjectSubdomain.PresentationLayer.ProjectRequestModel;
import com.example.portfolio.ProjectSubdomain.PresentationLayer.ProjectResponseModel;
import com.example.portfolio.SkillsSubdomain.DataLayer.Skill;
import com.example.portfolio.SkillsSubdomain.PresentationLayer.SkillRequestModel;
import com.example.portfolio.SkillsSubdomain.PresentationLayer.SkillResponseModel;
import com.example.portfolio.UserSubdomain.DataLayer.User;
import com.example.portfolio.UserSubdomain.PresentationLayer.UserResponseModel;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class EntityDTOUtil {


    public static FelixResponseModel toFelixResponseDTO(Felix felix) {
        FelixResponseModel felixResponseModel = new FelixResponseModel();
        BeanUtils.copyProperties(felix, felixResponseModel);
        return felixResponseModel;
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

    public static UserResponseModel toUserResponseModel(User user) {
        UserResponseModel model = new UserResponseModel();
        model.setUserId(user.getUserId());
        model.setEmail(user.getEmail());
        model.setFirstName(user.getFirstName());
        model.setLastName(user.getLastName());
        model.setRoles(user.getRoles());
        model.setPermissions(user.getPermissions());
        return model;
    }

    public static String generateOrderIdString() {
        return UUID.randomUUID().toString();
    }

    public static CommentResponseModel toCommentResponseDTO(Comment comment) {
        CommentResponseModel commentResponseModel = new CommentResponseModel();
        BeanUtils.copyProperties(comment, commentResponseModel);
        return commentResponseModel;
    }

    public static Comment toCommentEntity(CommentRequestModel commentRequestModel) {
        return Comment.builder()
                .commentId(generateCommentIdString())
                .author(commentRequestModel.getAuthor())
                .date(commentRequestModel.getDate())
                .comment(commentRequestModel.getComment())
                .isApproved(commentRequestModel.isApproved())
                .build();
    }

    public static String generateSkillIdString() {
        return UUID.randomUUID().toString();
    }

    public static SkillResponseModel toSkillResponseDTO(Skill skill) {
        SkillResponseModel skillResponseModel = new SkillResponseModel();
        BeanUtils.copyProperties(skill, skillResponseModel);
        return skillResponseModel;
    }

    public static Skill toSkillEntity(SkillRequestModel skillRequestModel) {
        return Skill.builder()
                .skillId(generateSkillIdString())
                .skillName(skillRequestModel.getSkillName())
                .build();
    }

    public static String generateFelixIdString() {
        return UUID.randomUUID().toString();
    }

    private static String generateCommentIdString() {
        return UUID.randomUUID().toString();
    }
}

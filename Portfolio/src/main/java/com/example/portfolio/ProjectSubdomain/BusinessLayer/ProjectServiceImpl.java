package com.example.portfolio.ProjectSubdomain.BusinessLayer;

import com.example.portfolio.ProjectSubdomain.DataLayer.ProjectRepository;
import com.example.portfolio.ProjectSubdomain.PresentationLayer.ProjectRequestModel;
import com.example.portfolio.ProjectSubdomain.PresentationLayer.ProjectResponseModel;
import com.example.portfolio.utils.EntityDTOUtil;
import com.example.portfolio.utils.exceptions.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Service
@Slf4j
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepository projectRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public Flux<ProjectResponseModel> getAllProjects() {
        return projectRepository.findAll().map(EntityDTOUtil::toProjectResponseModel);
    }

    @Override
    public Mono<ProjectResponseModel> AddProject(Mono<ProjectRequestModel> projectRequestModel) {
        return projectRequestModel
                .map(request->{
                    return EntityDTOUtil.toProjectEntity(request);
                })
                .flatMap(projectRepository::insert)
                .flatMap(savedProject-> projectRepository.findByProjectId(savedProject.getProjectId()))
                .map(EntityDTOUtil::toProjectResponseModel);

    }

    @Override
    public Mono<ProjectResponseModel> EditProject(Mono<ProjectRequestModel> projectRequestModel, String projectId) {
        return projectRepository.findByProjectId(projectId)
                .flatMap(existingProject -> projectRequestModel.map(requestModel->{
                    existingProject.setProjectName(requestModel.getProjectName());
                    existingProject.setDescription(requestModel.getDescription());
                    existingProject.setImageUrl(requestModel.getImageUrl());
                    existingProject.setSkills(requestModel.getSkills());
                    return existingProject;
                }))
                .switchIfEmpty(Mono.error(new NotFoundException("Project not found with id: " + projectId)))
                .flatMap(projectRepository::save)
                .map(EntityDTOUtil::toProjectResponseModel);
    }

    @Override
    public Mono<ProjectResponseModel> GetProject(String projectId) {
        return projectRepository.findByProjectId(projectId).map(EntityDTOUtil::toProjectResponseModel);
    }

    @Override
    public Mono<Void> DeleteProject(String projectId) {
        return projectRepository.findByProjectId(projectId)
                .switchIfEmpty(Mono.error(new NotFoundException("Project not found with id: " + projectId)))
                .flatMap(projectRepository::delete)
                .then();
    }

}

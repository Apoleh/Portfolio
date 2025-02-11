package com.example.portfolio.ProjectSubdomain.BusinessLayer;

import com.example.portfolio.ProjectSubdomain.PresentationLayer.ProjectRequestModel;
import com.example.portfolio.ProjectSubdomain.PresentationLayer.ProjectResponseModel;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


public interface ProjectService {
    Flux<ProjectResponseModel> getAllProjects();
    Mono<ProjectResponseModel> AddProject(Mono<ProjectRequestModel> projectRequestModel);
    Mono<ProjectResponseModel> EditProject(Mono<ProjectRequestModel> projectRequestModel, String projectId);

    Mono<ProjectResponseModel> GetProject(String projectId);

    Mono<Void> DeleteProject(String projectId);
}

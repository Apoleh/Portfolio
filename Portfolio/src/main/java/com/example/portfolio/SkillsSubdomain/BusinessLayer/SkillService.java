package com.example.portfolio.SkillsSubdomain.BusinessLayer;


import com.example.portfolio.SkillsSubdomain.PresentationLayer.SkillRequestModel;
import com.example.portfolio.SkillsSubdomain.PresentationLayer.SkillResponseModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface SkillService {

    Flux<SkillResponseModel> getAllSkills();

    Mono<SkillResponseModel> addSkill(Mono<SkillRequestModel> skillRequestModel);

    Mono<Void> deleteSkill(String skillId);
}

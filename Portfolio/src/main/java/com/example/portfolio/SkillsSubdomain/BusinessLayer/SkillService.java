package com.example.portfolio.SkillsSubdomain.BusinessLayer;


import com.example.portfolio.SkillsSubdomain.PresentationLayer.SkillResponseModel;
import reactor.core.publisher.Flux;

public interface SkillService {

    Flux<SkillResponseModel> getAllSkills();
}

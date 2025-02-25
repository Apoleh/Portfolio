package com.example.portfolio.SkillsSubdomain.BusinessLayer;

import com.example.portfolio.SkillsSubdomain.DataLayer.SkillRepository;
import com.example.portfolio.SkillsSubdomain.PresentationLayer.SkillRequestModel;
import com.example.portfolio.SkillsSubdomain.PresentationLayer.SkillResponseModel;
import com.example.portfolio.utils.EntityDTOUtil;
import com.example.portfolio.utils.exceptions.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class SkillServiceImpl implements SkillService {

    private final SkillRepository skillRepository;

    public SkillServiceImpl(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    @Override
    public Flux<SkillResponseModel> getAllSkills() {
        return skillRepository.findAll().map(EntityDTOUtil::toSkillResponseDTO);
    }

    @Override
    public Mono<SkillResponseModel> addSkill(Mono<SkillRequestModel> skillRequestModel) {
        return skillRequestModel
                .map(EntityDTOUtil::toSkillEntity)
                .flatMap(skillRepository::insert)
                .flatMap(savedSkill -> skillRepository.findBySkillId(savedSkill.getSkillId()))
                .map(EntityDTOUtil::toSkillResponseDTO)
                .doOnSuccess(response -> log.info("Skill added successfully with ID: {}", response.getSkillId()));
    }

    @Override
    public Mono<Void> deleteSkill(String skillId) {
        return skillRepository.findBySkillId(skillId)
                .doOnNext(skill -> System.out.println("Found skill: " + skill))  // Debugging line
                .switchIfEmpty(Mono.error(new NotFoundException("Skill not found with id: " + skillId)))
                .flatMap(skillRepository::delete)
                .then();
    }

}

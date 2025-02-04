package com.example.portfolio.SkillsSubdomain.BusinessLayer;

import com.example.portfolio.SkillsSubdomain.DataLayer.SkillRepository;
import com.example.portfolio.SkillsSubdomain.PresentationLayer.SkillResponseModel;
import com.example.portfolio.utils.EntityDTOUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
@Slf4j
public class SkillServiceImpl implements SkillService {

    private final SkillRepository skillRepository;

    public SkillServiceImpl(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    @Override
    public Flux<SkillResponseModel> getAllSkills() {
        return skillRepository.findAll().map(EntityDTOUtil::toSkillResponseModel);
    }
}

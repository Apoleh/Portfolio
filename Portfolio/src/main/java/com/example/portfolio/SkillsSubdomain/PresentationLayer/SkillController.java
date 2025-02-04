package com.example.portfolio.SkillsSubdomain.PresentationLayer;

import com.example.portfolio.SkillsSubdomain.BusinessLayer.SkillService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("api/v1/skill")
@Validated
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping()
    public Flux<SkillResponseModel> getAllSkills() {
        return skillService.getAllSkills();
    }
}

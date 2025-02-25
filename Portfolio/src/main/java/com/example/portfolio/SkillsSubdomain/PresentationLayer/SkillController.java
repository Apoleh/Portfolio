package com.example.portfolio.SkillsSubdomain.PresentationLayer;

import com.example.portfolio.CommentsSubdomain.PresentationLayer.CommentRequestModel;
import com.example.portfolio.CommentsSubdomain.PresentationLayer.CommentResponseModel;
import com.example.portfolio.SkillsSubdomain.BusinessLayer.SkillService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

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

    @PostMapping("")
    public Mono<ResponseEntity<SkillResponseModel>> addSkill(@RequestBody Mono<SkillRequestModel> skillRequestModel) {
        return skillService.addSkill(skillRequestModel)
                .map(response -> ResponseEntity.status(HttpStatus.CREATED).body(response));
    }

    @DeleteMapping("/{skillId}")
    public Mono<ResponseEntity<Void>> deleteSkill(@PathVariable String skillId) {
        return skillService.deleteSkill(skillId)
                .then(Mono.just(new ResponseEntity<Void>(HttpStatus.NO_CONTENT)))
                .onErrorResume(e -> Mono.just(new ResponseEntity<Void>(HttpStatus.NOT_FOUND)));
    }

}

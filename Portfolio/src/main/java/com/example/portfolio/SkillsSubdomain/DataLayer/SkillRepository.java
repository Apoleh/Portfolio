package com.example.portfolio.SkillsSubdomain.DataLayer;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface SkillRepository extends ReactiveMongoRepository<Skill, String> {
    Mono<Skill> findBySkillId(String skillId);
}

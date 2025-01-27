package com.example.portfolio.FelixSubdomain.DataLayer;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface FelixRepository extends ReactiveMongoRepository<Felix, String> {

    Mono<Felix> findFelixByFelixId(String felix);

}

package com.example.portfolio.FelixSubdomain.BusinessLayer;

import com.example.portfolio.FelixSubdomain.PresentationLayer.FelixRequestModel;
import com.example.portfolio.FelixSubdomain.PresentationLayer.FelixResponseModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface FelixService {
    Flux<FelixResponseModel> getAllFelix();

    Mono<FelixResponseModel> EditFelix(Mono<FelixRequestModel> felixRequestModel, String felixId);

}

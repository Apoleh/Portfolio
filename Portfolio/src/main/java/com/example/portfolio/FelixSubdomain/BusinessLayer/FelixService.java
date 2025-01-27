package com.example.portfolio.FelixSubdomain.BusinessLayer;

import com.example.portfolio.FelixSubdomain.PresentationLayer.FelixResponseModel;
import reactor.core.publisher.Flux;

public interface FelixService {
    Flux<FelixResponseModel> getAllFelix();

}

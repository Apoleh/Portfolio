package com.example.portfolio.FelixSubdomain.PresentationLayer;

import com.example.portfolio.FelixSubdomain.BusinessLayer.FelixService;
import com.example.portfolio.ProjectSubdomain.PresentationLayer.ProjectRequestModel;
import com.example.portfolio.ProjectSubdomain.PresentationLayer.ProjectResponseModel;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("api/v1/felix")
@Validated
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class FelixController {

    private final FelixService felixService;

    public FelixController(FelixService felixService) {
        this.felixService = felixService;
    }

    @GetMapping()
    public Flux<FelixResponseModel> getAllFelix() {
        return felixService.getAllFelix();
    }

    @PutMapping("/{felixId}")
    public Mono<FelixResponseModel> updateFelix(@PathVariable String felixId, @RequestBody Mono<FelixRequestModel> felixRequestModel) {
        return felixService.EditFelix(felixRequestModel, felixId);
    }
}

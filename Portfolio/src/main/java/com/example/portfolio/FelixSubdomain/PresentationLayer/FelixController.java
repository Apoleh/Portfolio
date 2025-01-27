package com.example.portfolio.FelixSubdomain.PresentationLayer;

import com.example.portfolio.FelixSubdomain.BusinessLayer.FelixService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

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
}

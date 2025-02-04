package com.example.portfolio.FelixSubdomain.BusinessLayer;

import com.example.portfolio.FelixSubdomain.DataLayer.FelixRepository;
import com.example.portfolio.FelixSubdomain.PresentationLayer.FelixResponseModel;
import com.example.portfolio.utils.EntityDTOUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
@Slf4j
public class FelixServiceImpl implements FelixService {

    private final FelixRepository felixRepository;

    public FelixServiceImpl(FelixRepository felixRepository) {
        this.felixRepository = felixRepository;
    }

    @Override
    public Flux<FelixResponseModel> getAllFelix() {
        return felixRepository.findAll().map(EntityDTOUtil::toFelixResponseDTO);
    }
}

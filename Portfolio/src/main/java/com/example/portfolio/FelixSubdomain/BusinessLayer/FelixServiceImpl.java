package com.example.portfolio.FelixSubdomain.BusinessLayer;

import com.example.portfolio.FelixSubdomain.DataLayer.FelixRepository;
import com.example.portfolio.FelixSubdomain.PresentationLayer.FelixRequestModel;
import com.example.portfolio.FelixSubdomain.PresentationLayer.FelixResponseModel;
import com.example.portfolio.ProjectSubdomain.PresentationLayer.ProjectRequestModel;
import com.example.portfolio.ProjectSubdomain.PresentationLayer.ProjectResponseModel;
import com.example.portfolio.utils.EntityDTOUtil;
import com.example.portfolio.utils.exceptions.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

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

    @Override
    public Mono<FelixResponseModel> EditFelix(Mono<FelixRequestModel> felixRequestModel, String felixId) {
        return felixRepository.findFelixByFelixId(felixId)
                .flatMap(existingFelix -> felixRequestModel.map(requestModel->{
                    existingFelix.setFirstName(requestModel.getFirstName());
                    existingFelix.setLastName(requestModel.getLastName());
                    existingFelix.setAge(requestModel.getAge());
                    existingFelix.setNationality(requestModel.getNationality());
                    existingFelix.setAboutMe(requestModel.getAboutMe());

                    return existingFelix;
                }))
                .switchIfEmpty(Mono.error(new NotFoundException("Felix not found with id: " + felixId)))
                .flatMap(felixRepository::save)
                .map(EntityDTOUtil::toFelixResponseDTO);
    }

}

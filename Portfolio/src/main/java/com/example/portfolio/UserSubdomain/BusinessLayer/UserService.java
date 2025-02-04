package com.example.portfolio.UserSubdomain.BusinessLayer;


import com.example.portfolio.UserSubdomain.PresentationLayer.UserRequestModel;
import com.example.portfolio.UserSubdomain.PresentationLayer.UserResponseModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface UserService {

    Mono<UserResponseModel> addUserFromAuth0(String auth0UserId);
    Mono<UserResponseModel> syncUserWithAuth0(String auth0UserId);
}


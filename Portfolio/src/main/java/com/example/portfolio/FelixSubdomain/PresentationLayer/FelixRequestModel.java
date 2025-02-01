package com.example.portfolio.FelixSubdomain.PresentationLayer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FelixRequestModel {
    String firstName;
    String lastName;
    int age;
    String nationality;
    String aboutMe;
}

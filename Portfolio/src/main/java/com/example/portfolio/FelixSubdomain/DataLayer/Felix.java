package com.example.portfolio.FelixSubdomain.DataLayer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Felix {

    @Id
    private String id;
    private String felixId;
    private String firstName;
    private String lastName;
    private int age;
    private String nationality;
    private String aboutMe;
}

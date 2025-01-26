package com.example.portfolio.MyselfSubdomain.DataLayer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Zako {

    @Id
    private String id;
    private String zakoId;
    private String name;
    private String interest;
    private int age;
    private String nationality;
}

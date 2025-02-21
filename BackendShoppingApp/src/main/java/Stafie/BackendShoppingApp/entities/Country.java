package Stafie.BackendShoppingApp.entities;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "country")
@Getter
@Setter
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @JsonProperty("id")
    private int id;

    @Column(name = "code")
    @JsonProperty("code")
    private String code;

    @Column(name = "name")
    @JsonProperty("name")
    private String name;

    @OneToMany(mappedBy = "country")
    private Set<State> states;
}

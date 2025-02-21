package Stafie.BackendShoppingApp.entities;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "state")
public class State {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @JsonProperty("id")
    private Long id;

    @Column(name = "name")
    @JsonProperty("name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "country_id")
    @JsonProperty( "country_id")
    private Country country;
}

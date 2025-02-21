package Stafie.BackendShoppingApp.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name="shopping")
@Data
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @JsonProperty("id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    @JsonProperty("category")
    private ProductCategory category;

    @JsonProperty("sku")
    @Column(name = "sku")
    private String sku;

    @JsonProperty("name")
    @Column(name = "name")
    private String name;

    @Column(name = "description")
    @JsonProperty("description")
    private String description;

    @Column(name = "unit_price")
    @JsonProperty("unitPrice")
    private BigDecimal unitPrice;

    @Column(name = "image_url")
    @JsonProperty("imageUrl")
    private String imageUrl;

    @Column(name = "active")
    @JsonProperty("active")
    private boolean active;

    @Column(name = "units_in_stock")
    @JsonProperty("unitsInStock")
    private int unitsInStock;

    @Column(name = "date_created")
    @CreationTimestamp
    @JsonProperty("dateCreated")
    private Date dateCreated;

    @Column(name = "last_updated")
    @UpdateTimestamp
    @JsonProperty("lastUpdated")
    private Date lastUpdated;


}
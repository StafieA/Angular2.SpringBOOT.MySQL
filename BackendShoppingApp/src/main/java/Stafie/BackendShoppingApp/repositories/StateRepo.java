package Stafie.BackendShoppingApp.repositories;

import Stafie.BackendShoppingApp.entities.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;


@CrossOrigin("http://localhost:4200")
@RepositoryRestResource
public interface StateRepo extends JpaRepository<State,Long> {

    List<State> findByCountryCode(@Param("code") String code);
}

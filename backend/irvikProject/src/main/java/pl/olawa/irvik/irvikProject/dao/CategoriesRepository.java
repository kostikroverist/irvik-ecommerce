package pl.olawa.irvik.irvikProject.dao;

import org.springframework.data.repository.CrudRepository;
import pl.olawa.irvik.irvikProject.domain.Categories;

import java.util.Optional;
import java.util.UUID;

public interface CategoriesRepository extends CrudRepository<Categories,UUID> {


        Optional<Categories> findById(UUID id);

        void deleteById(UUID id);
}

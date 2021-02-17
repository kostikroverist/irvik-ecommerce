package pl.olawa.irvik.irvikProject.service;

import org.springframework.http.ResponseEntity;
import pl.olawa.irvik.irvikProject.domain.Categories;
import pl.olawa.irvik.irvikProject.dto.CategoriesDto;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CategoriesService {

    public Categories save(Categories categories);

    public ResponseEntity<Categories> update(UUID id, CategoriesDto categoriesDto);

    public Optional<Categories> findById(UUID categoriesId);

    List<Categories> getAllCategories();

    void delete(UUID id);


}

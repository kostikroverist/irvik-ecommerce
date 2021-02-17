package pl.olawa.irvik.irvikProject.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.olawa.irvik.irvikProject.domain.Categories;

import java.util.UUID;

public interface CategoriesJpaRepo extends JpaRepository<Categories, UUID> {


}

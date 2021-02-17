package pl.olawa.irvik.irvikProject.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.olawa.irvik.irvikProject.domain.Products;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Products, Long>, JpaSpecificationExecutor<Products> {

    Optional<Products> findById(UUID id);

    List<Products> findAll();

    List<Products> findByTotalPrice(int totalPrice);

    List<Products> findByIsAvailable(boolean isAvailable);

    List<Products> findByWidth(int width);

    List<Products> findByLength(int length);

    List<Products> findByHeight(int height);

    @Query("SELECT p FROM Products  p WHERE p.fullTextName LIKE %?1%")
    List<Products> findByFullTextNameLike(String fullTextName);
}

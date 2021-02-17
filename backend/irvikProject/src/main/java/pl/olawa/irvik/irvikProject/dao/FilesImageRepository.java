package pl.olawa.irvik.irvikProject.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.olawa.irvik.irvikProject.domain.Filesimage;
import pl.olawa.irvik.irvikProject.domain.Products;

import java.util.List;
import java.util.UUID;

@Repository
public interface FilesImageRepository extends JpaRepository<Filesimage,Long> {


    @Query(value = "SELECT * FROM filesimage where products_id = ?1" , nativeQuery = true)
    List<Filesimage> getAllByProducts(UUID prdoctId);

    void deleteAllByProductsIsNull();

}

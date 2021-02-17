package pl.olawa.irvik.irvikProject.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import pl.olawa.irvik.irvikProject.domain.Products;
import java.util.UUID;
public interface ProductsCrudRepo extends CrudRepository<Products, Long> {

        Page<Products>findAll(Pageable pageable);

}

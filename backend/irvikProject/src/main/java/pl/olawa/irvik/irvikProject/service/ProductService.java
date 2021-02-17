package pl.olawa.irvik.irvikProject.service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import pl.olawa.irvik.irvikProject.domain.Products;
import pl.olawa.irvik.irvikProject.dto.ProductsDto;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductService {


     Products save(Products products);

    void delete(Long id);

    Products update(Long id, ProductsDto products);

    Optional<Products> findById(Long productId);


    List<Products> getAllProducts();

    List<Products> findByTotalPrice(int totalPrice);

    List<Products> findByIsAvailable(boolean isAvailable);

    List<Products> findByWidth(int width);

    List<Products> findByLength(int length);

    List<Products> findByHeight(int height);

    List<Products>searchByFullTextName(String fullTextName);
}

package pl.olawa.irvik.irvikProject.service.imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.olawa.irvik.irvikProject.dao.FilesImageRepository;
import pl.olawa.irvik.irvikProject.dao.ProductRepository;
import pl.olawa.irvik.irvikProject.dao.ProductsCrudRepo;
import pl.olawa.irvik.irvikProject.domain.Filesimage;
import pl.olawa.irvik.irvikProject.domain.Products;
import pl.olawa.irvik.irvikProject.dto.ProductsDto;
import pl.olawa.irvik.irvikProject.exception.ProductnotFoundException;
import pl.olawa.irvik.irvikProject.service.ProductService;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceIml implements ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductsCrudRepo productsCrudRepo;
    @Autowired
    private FilesImageRepository fileImageService;


    @Override
    @Transactional
    public Products save(Products product) {

        //   Filesimage filesimage = new Filesimage(products);

        List<Filesimage> filesImageList = product.getImages();


        for (Filesimage filesimage : filesImageList) {
            filesimage.setProducts(product);
        }
        product = productRepository.save(product);
        return product;

    }


    @Override
    public void delete(Long id) {
        productsCrudRepo.deleteById(id);
    }

    @Override
//    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public Products update(Long id, ProductsDto productsDto) {
        Products products = productRepository.findById(id).orElseThrow(() -> new ProductnotFoundException("products not exist with id :" + id));
        products.setMaterialEn(productsDto.getMaterialEn());
        products.setMaterialPl(productsDto.getMaterialPl());
        products.setMaterialUk(productsDto.getMaterialUk());
        products.setTitleEn(productsDto.getTitleEn());
        products.setTitlePl(productsDto.getTitlePl());
        products.setTitleUk(productsDto.getTitleUk());
        products.setDescriptionEn(productsDto.getDescriptionEn());
        products.setDescriptionPl(productsDto.getDescriptionPl());
        products.setDescriptionUk(productsDto.getDescriptionUk());
        products.setCategory(productsDto.getCategory());
        products.setUnitId(productsDto.getUnitId());
        products.setCount(productsDto.getCount());
        products.setPrice(productsDto.getPrice());
        products.setTotalPrice(productsDto.getTotalPrice());
        products.setDiscountPercent(productsDto.getDiscountPercent());
        products.setDiscount(productsDto.isDiscount());
        products.setAvailable(productsDto.isAvailable());
        products.setDateOfEdition(productsDto.getDateOfEdition());
        products.setWidth(productsDto.getWidth());
        products.setLength(products.getLength());
        products.setHeight(productsDto.getHeight());
        products.setFullTextName(productsDto.getFullTextName());


        List<Filesimage> filesImageList = productsDto.getImages();
        List<Filesimage> images = products.getImages();
        images.removeAll(filesImageList);

        for (Filesimage image : images) {
            image.setProducts(null);
        }
        fileImageService.saveAll(images);
        for (Filesimage imageFromDto : filesImageList) {
            imageFromDto.setProducts(products);
        }


//        fileImageService.saveAll(filesImageList);
        products.setImages(filesImageList);


        Products saved = productRepository.save(products);

        return saved;
    }


    @Override
    public Optional<Products> findById(Long productId) {
        return productRepository.findById(productId);
    }

    @Override
    @Transactional
    public List<Products> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Products> findByTotalPrice(int totalPrice) {
        return productRepository.findByTotalPrice(totalPrice);
    }


    @Override
    public List<Products> findByIsAvailable(boolean isAvailable) {
        return productRepository.findByIsAvailable(isAvailable);
    }

    @Override
    public List<Products> findByWidth(int width) {
        return productRepository.findByWidth(width);
    }

    @Override
    public List<Products> findByLength(int length) {
        return productRepository.findByLength(length);
    }

    @Override
    public List<Products> findByHeight(int height) {
        return productRepository.findByHeight(height);
    }

    @Override
    public List<Products> searchByFullTextName(String fullTextName) {
        return productRepository.findByFullTextNameLike(fullTextName);
    }


    //exception

}

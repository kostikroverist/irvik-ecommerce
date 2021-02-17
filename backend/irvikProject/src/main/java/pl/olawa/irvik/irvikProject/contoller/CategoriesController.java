package pl.olawa.irvik.irvikProject.contoller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.olawa.irvik.irvikProject.domain.Categories;
import pl.olawa.irvik.irvikProject.dto.CategoriesDto;
import pl.olawa.irvik.irvikProject.service.CategoriesService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/")
public class CategoriesController {

    @Autowired
    private CategoriesService categoriesService;


    @GetMapping("/categories")
    public List<Categories> allCategories(){
        return categoriesService.getAllCategories();
    }

   @PostMapping("/test/categories")
    public Categories addCategory(@RequestBody Categories categories){
       return  categoriesService.save(categories);
   }

  
   
   @PutMapping("/test/categories/{id}")
    public  void update(@PathVariable("id") java.util.UUID id, @RequestBody  CategoriesDto categoriesDto){
         categoriesService.update(id,categoriesDto);
   }
   
   @DeleteMapping("/test/categories/{id}")
    void  daleteById (@PathVariable("id") UUID id){
       categoriesService.delete(id);
   }


   
}

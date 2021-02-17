package pl.olawa.irvik.irvikProject.dto;

import com.fasterxml.jackson.databind.annotation.JsonNaming;

import javax.persistence.Column;

public class CategoriesDto {

    private String categoryEn;

    private String categoryUk;

    private String categoryPl;


    public String getCategoryEn() {
        return categoryEn;
    }

    public void setCategoryEn(String categoryEn) {
        this.categoryEn = categoryEn;
    }

    public String getCategoryUk() {
        return categoryUk;
    }

    public void setCategoryUk(String categoryUk) {
        this.categoryUk = categoryUk;
    }

    public String getCategoryPl() {
        return categoryPl;
    }

    public void setCategoryPl(String categoryPl) {
        this.categoryPl = categoryPl;
    }
}

package pl.olawa.irvik.irvikProject.dto;


import pl.olawa.irvik.irvikProject.domain.Filesimage;

import java.util.Date;
import java.util.List;

public class ProductsDto {


    private String titleEn;

    private String titlePl;

    private String titleUk;

    private String descriptionEn;

    private String descriptionPl;

    private String descriptionUk;

    private boolean isDiscount;

    private String unitId;

    private int count;

    private double price;

    private String materialUk;

    private String materialPl;

    private String materialEn;

    private String category;

    private String discountPercent;

private double totalPrice;

    private boolean isAvailable;

    //    @OneToMany(fetch = FetchType.LAZY, cascade = { CascadeType.ALL,CascadeType.PERSIST,CascadeType.MERGE }, mappedBy = "products")
//    @Column(nullable = false)

    private List<Filesimage> images;

    private Date dateOfEdition;

    private String width;

    private String length;

    private String height;

    private String fullTextName;

    public ProductsDto() {
    }

    public String getTitleEn() {
        return titleEn;
    }

    public void setTitleEn(String titleEn) {
        this.titleEn = titleEn;
    }

    public String getTitlePl() {
        return titlePl;
    }

    public void setTitlePl(String titlePl) {
        this.titlePl = titlePl;
    }

    public String getTitleUk() {
        return titleUk;
    }

    public void setTitleUk(String titleUk) {
        this.titleUk = titleUk;
    }

    public String getDescriptionEn() {
        return descriptionEn;
    }

    public void setDescriptionEn(String descriptionEn) {
        this.descriptionEn = descriptionEn;
    }

    public String getDescriptionPl() {
        return descriptionPl;
    }

    public void setDescriptionPl(String descriptionPl) {
        this.descriptionPl = descriptionPl;
    }

    public String getDescriptionUk() {
        return descriptionUk;
    }

    public void setDescriptionUk(String descriptionUk) {
        this.descriptionUk = descriptionUk;
    }

    public boolean isDiscount() {
        return isDiscount;
    }

    public void setDiscount(boolean discount) {
        isDiscount = discount;
    }

    public String getUnitId() {
        return unitId;
    }

    public void setUnitId(String unitId) {
        this.unitId = unitId;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getMaterialUk() {
        return materialUk;
    }

    public void setMaterialUk(String materialUk) {
        this.materialUk = materialUk;
    }

    public String getMaterialPl() {
        return materialPl;
    }

    public void setMaterialPl(String materialPl) {
        this.materialPl = materialPl;
    }

    public String getMaterialEn() {
        return materialEn;
    }

    public void setMaterialEn(String materialEn) {
        this.materialEn = materialEn;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDiscountPercent() {
        return discountPercent;
    }

    public void setDiscountPercent(String discountPercent) {
        this.discountPercent = discountPercent;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }

    public List<Filesimage> getImages() {
        return images;
    }

    public void setImages(List<Filesimage> images) {
        this.images = images;
    }

    public Date getDateOfEdition() {
        return dateOfEdition;
    }

    public void setDateOfEdition(Date dateOfEdition) {
        this.dateOfEdition = dateOfEdition;
    }

    public String getWidth() {
        return width;
    }

    public void setWidth(String width) {
        this.width = width;
    }

    public String getLength() {
        return length;
    }

    public void setLength(String length) {
        this.length = length;
    }

    public String getHeight() {
        return height;
    }

    public void setHeight(String height) {
        this.height = height;
    }

    public String getFullTextName() {
        return fullTextName;
    }

    public void setFullTextName(String fullTextName) {
        this.fullTextName = fullTextName;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }
}

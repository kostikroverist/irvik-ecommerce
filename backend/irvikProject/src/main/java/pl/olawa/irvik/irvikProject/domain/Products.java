package pl.olawa.irvik.irvikProject.domain;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import static javax.persistence.CascadeType.*;

@Entity
@Table
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String titleEn;
    @Column
    private String titlePl;
    @Column
    private String titleUk;
    @Column
    private String descriptionEn;
    @Column
    private String descriptionPl;
    @Column
    private String descriptionUk;
    @Column
    private boolean isDiscount;
    @Column
    private String unitId;
    @Column
    private int count;
    @Column
    private double price;
    @Column
    private String materialUk;
    @Column
    private String materialPl;
    @Column
    private String materialEn;
    @Column
    private String category;
    @Column
    private String discountPercent;
    @Column
    private double totalPrice;
    @Column
    private boolean isAvailable;

    @OneToMany(fetch = FetchType.EAGER, cascade = {ALL}, mappedBy = "products")
    @Column(nullable = false)
//    @Lob
//    @ElementCollection
    private List<Filesimage> images;
    @Column
    private Date dateOfEdition;
    @Column
    private String width;
    @Column
    private String length;
    @Column
    private String height;
    @Column
    private String fullTextName;

    public Products() {
    }

    public Products(String titleEn, String titlePl, String titleUk, String descriptionEn, String descriptionPl, String descriptionUk, boolean isDiscount, String unitId, int count, double price, String materialUk, String materialPl, String materialEn, String category, String discountPercent, double totalPrice, boolean isAvailable, List<Filesimage> images, Date dateOfEdition, String width, String length, String height, String fullTextName) {
        this.titleEn = titleEn;
        this.titlePl = titlePl;
        this.titleUk = titleUk;
        this.descriptionEn = descriptionEn;
        this.descriptionPl = descriptionPl;
        this.descriptionUk = descriptionUk;
        this.isDiscount = isDiscount;
        this.unitId = unitId;
        this.count = count;
        this.price = price;
        this.materialUk = materialUk;
        this.materialPl = materialPl;
        this.materialEn = materialEn;
        this.category = category;
        this.discountPercent = discountPercent;
        this.totalPrice = totalPrice;
        this.isAvailable = isAvailable;
        this.images = images;
        this.dateOfEdition = dateOfEdition;
        this.width = width;
        this.length = length;
        this.height = height;
        this.fullTextName = fullTextName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
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
}

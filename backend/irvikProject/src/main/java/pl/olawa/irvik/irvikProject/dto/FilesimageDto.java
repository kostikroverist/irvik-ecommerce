package pl.olawa.irvik.irvikProject.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import pl.olawa.irvik.irvikProject.domain.Products;

public class FilesimageDto {


    @JsonProperty("Bucket")
    private String imageBucket;
    @JsonProperty("Key")
    private String imageKey;
    @JsonProperty("Location")
    private String imageLocation;
    @JsonProperty("key")
    private String imageKeyTwo;

    public FilesimageDto(String imageBucket, String imageKey, String imageLocation, String imageKeyTwo) {
        this.imageBucket = imageBucket;
        this.imageKey = imageKey;
        this.imageLocation = imageLocation;
        this.imageKeyTwo = imageKeyTwo;
    }

    public FilesimageDto() {
    }

    public String getImageBucket() {
        return imageBucket;
    }

    public void setImageBucket(String imageBucket) {
        this.imageBucket = imageBucket;
    }

    public String getImageKey() {
        return imageKey;
    }

    public void setImageKey(String imageKey) {
        this.imageKey = imageKey;
    }

    public String getImageLocation() {
        return imageLocation;
    }

    public void setImageLocation(String imageLocation) {
        this.imageLocation = imageLocation;
    }

    public String getImageKeyTwo() {
        return imageKeyTwo;
    }

    public void setImageKeyTwo(String imageKeyTwo) {
        this.imageKeyTwo = imageKeyTwo;
    }
}

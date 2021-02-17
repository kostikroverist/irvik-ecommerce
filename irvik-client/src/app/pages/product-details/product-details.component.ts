import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';
import { Gallery } from 'angular-gallery';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductTranslate } from 'src/app/shared/models/product-translate.model';
import { TranslateService } from '@ngx-translate/core';
import { IFileS3 } from '../../shared/interfaces/fileS3.interface';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product!: IProduct | null;
  activeImage = '';
  images: IFileS3[] = [];
  isDisabledPrevArrow = false;
  isDisabledNextArrow = false;
  title = '';
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    autoplay: false,
    startPosition: 0,

    responsive: {
      0: {
        items: 3,
      },
    },
    nav: false,
    margin: 10,
  };
  carouselOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 600,
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      420: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1068: {
        items: 4,
      },
    },
    nav: false,
    margin: 10,
  };
  slider: any;
  products: IProduct[] = [];
  percent!: string | null;
  constructor(
    private productsService: ProductService,
    private route: ActivatedRoute,
    private gallery: Gallery,
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProduct();
    this.getProducts();
    setTimeout(() => {
      this.translate.setDefaultLang(localStorage.getItem('lang') || 'pl');
    }, 100);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getProduct();
        this.getProducts();
      }
    });
  }
  private getProducts(): void {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
      const translatedProducts = new ProductTranslate(products, this.translate);
      translatedProducts.prepareToTranslate();
    });
  }

  private getProduct(): void {
    const productId = this.route.snapshot.paramMap.get('id') || '';
    this.productsService.getProductById(productId).subscribe((product) => {
      this.product = product;
      this.images = product.images;
      this.openImage();
      this.slider = this.sliderImages();
      this.isDisabledPrevArrow = true;
      this.checkPercent(product);
    });
  }

  public showGallery(index: number): void {
    const prop = {
      images: this.images.map((img) => ({ path: img.Location })),
      index,
    };
    this.gallery.load(prop);
  }

  private sliderImages(img?: string): any {
    let index = 0;
    const imagesLength = this.images.length;

    if (img) {
      index = this.images.findIndex((v) => img === v.Location);
      if (index === imagesLength - 1) {
        this.isDisabledNextArrow = true;
        this.isDisabledPrevArrow = false;
      } else if (index === 0) {
        this.isDisabledPrevArrow = true;
        this.isDisabledNextArrow = false;
      } else {
        this.isDisabledNextArrow = false;
        this.isDisabledPrevArrow = false;
      }
    }
    return {
      next: (): void => {
        if (index <= imagesLength - 2) {
          index++;
          this.activeImage = this.images[index].Location;
          this.customOptions.slideBy = index;
          this.customOptions.startPosition = index;
          this.isDisabledNextArrow = false;
          this.isDisabledPrevArrow = false;
        } else {
          index = imagesLength - 1;
        }
        if (index === imagesLength - 1) {
          this.isDisabledNextArrow = true;
        }
      },
      prev: (): void => {
        if (index >= 1) {
          index--;
          this.activeImage = this.images[index].Location;
          this.isDisabledPrevArrow = false;
          this.isDisabledNextArrow = false;
        } else {
          this.isDisabledPrevArrow = true;
          index = 0;
        }
        if (index === 0) {
          this.isDisabledPrevArrow = true;
        }
      },
      index,
    };
  }

  public openImage(img?: string): void {
    if (img) {
      this.activeImage = img;
      this.slider = this.sliderImages(img);
    } else {
      this.activeImage = this.images[0].Location;
    }
  }

  public convertToSnakeCase(str: string): string {
    return str.split(' ').join('_');
  }

  public parse(str: string): number {
    if (typeof parseFloat(str) === 'number') {
      return parseFloat(str);
    } else {
      return 0;
    }
  }

  counter(isIncrement: boolean = true): number {
    let count: number;
    if (this.product) {
      if (isIncrement) {
        count = this.product.count++;
      } else {
        count = --this.product.count > 0 ? this.product.count : 1;
      }
      this.checkCount();
      return count;
    } else {
      return 1;
    }
  }

  public checkCount(): void {
    if (this.product && this.product.count <= 0) {
      this.product.count = 1;
    }
    if (this.product && this.product.count >= 10000) {
      this.product.count = 10000;
    }
  }

  private checkPercent(product: IProduct): void {
    if (product.discount) {
      this.percent =
        product.discountPercent?.charAt(product.discountPercent.length - 1) ===
        '%'
          ? product.discountPercent
          : product.discountPercent + '%';
    }
  }
}

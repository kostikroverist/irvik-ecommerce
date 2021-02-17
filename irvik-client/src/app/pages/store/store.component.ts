import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../shared/services/categories.service';
import { ICategory } from '../../shared/interfaces/category.interface';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from '../../shared/services/product.service';
import { IProduct } from '../../shared/interfaces/product.interface';
import { ProductTranslate } from '../../shared/models/product-translate.model';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  categories: ICategory[] = [];
  products: IProduct[] = [];
  searchName!: string;
  constructor(
    private categoriesServ: CategoriesService,
    private translate: TranslateService,
    private productsService: ProductService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
    setTimeout(() => {
      this.translate.setDefaultLang(localStorage.getItem('lang') || 'pl');
    }, 100);
  }

  getCategories(): void {
    this.categoriesServ.getCategories().subscribe((categories) => {
      this.categories = categories;
      this.categoryForTranslate(categories);
    });
  }

  getProducts(): void {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
      const translatedProducts = new ProductTranslate(products, this.translate);
      translatedProducts.prepareToTranslate();
    });
  }

  public searchProductsByFullText(category?: string): void {
    if (category) {
      category = category.split('').join('');
    }
    if (this.searchName || category) {
      this.productsService
        .getFullTextSearchProducts(this.searchName || category || '')
        .subscribe((products) => {
          this.products = products;
        });
    }
  }

  public convertToSnakeCase(str: string): string {
    return str.split(' ').join('_');
  }

  private categoryForTranslate(data: ICategory[]): void {
    const enCategories = new Map(
      data.map((v) => [[v.categoryEn.split(' ').join('_')], v.categoryEn])
    );
    const ukCategories = new Map(
      data.map((v) => [[v.categoryEn.split(' ').join('_')], v.categoryUk])
    );
    const plCategories = new Map(
      data.map((v) => [[v.categoryEn.split(' ').join('_')], v.categoryPl])
    );
    this.translate.setTranslation(
      'en',
      {
        categories: Object.fromEntries(enCategories),
      },
      true
    );
    this.translate.setTranslation(
      'uk',
      {
        categories: Object.fromEntries(ukCategories),
      },
      true
    );
    this.translate.setTranslation(
      'pl',
      {
        categories: Object.fromEntries(plCategories),
      },
      true
    );
  }
}

import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../shared/services/categories.service';
import { ICategory } from '../../shared/interfaces/category.interface';
import { Product } from '../../shared/models/product.model';
import { IProduct } from '../../shared/interfaces/product.interface';
import { ProductService } from '../../shared/services/product.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UploadService } from 'src/app/shared/services/upload.service';
import { IFileS3 } from '../../shared/interfaces/fileS3.interface';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  tabsIndex: number | undefined;
  arrFiles: IFileS3[] = [];
  productGroup!: FormGroup;
  isEditing = false;
  categories: ICategory[] = [];
  isGotProduct = false;
  products!: MatTableDataSource<IProduct>;
  columnsToDisplay = ['image', 'titleUk', 'price', 'unitId', 'edit', 'delete'];
  expandedElement!: IProduct | null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  editingProductId: string | number | undefined;
  unSubUploadFile!: Subscription;
  productsArr: IProduct[] = [];
  constructor(
    private categoryServ: CategoriesService,
    private productServ: ProductService,
    private uploadService: UploadService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
    this.productGroup = new FormGroup({
      category: new FormControl(null, Validators.required),
      unitId: new FormControl(null, Validators.required),
      width: new FormControl(null, Validators.required),
      height: new FormControl(null, Validators.required),
      length: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      discount: new FormControl(false),
      available: new FormControl(false),
      discountPercent: new FormControl(null),
      titleEn: new FormControl(null, Validators.required),
      titlePl: new FormControl(null, Validators.required),
      titleUk: new FormControl(null, Validators.required),
      materialUk: new FormControl(null, Validators.required),
      materialEn: new FormControl(null, Validators.required),
      materialPl: new FormControl(null, Validators.required),
      descriptionUk: new FormControl(null, Validators.required),
      descriptionEn: new FormControl(null, Validators.required),
      descriptionPl: new FormControl(null, Validators.required),
    });
    this.productGroup.controls.discountPercent.disable();
  }
  ngAfterViewInit(): void {
    if (this.isGotProduct) {
      this.products.paginator = this.paginator || null;
    }
  }
  private getCategories(): void {
    this.categoryServ.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  private getProducts(): void {
    this.productServ.getProducts().subscribe(
      (products) => {
        this.products = new MatTableDataSource<IProduct>(products);
        this.isGotProduct = true;
        this.productsArr = products;
      },
      (err) => console.log(err),
      () => {
        this.products.paginator = this.paginator || null;
      }
    );
  }

  public addProduct(): void {
    const {
      category,
      unitId,
      width,
      height,
      length,
      price,
      available,
      discountPercent,
      titleEn,
      titlePl,
      titleUk,
      discount,
      materialPl,
      materialEn,
      materialUk,
      descriptionEn,
      descriptionUk,
      descriptionPl,
    } = this.productGroup.value;
    const product: IProduct = new Product(
      category,
      unitId,
      width,
      height,
      length,
      price,
      available,
      discount,
      discountPercent || null,
      titleEn,
      titlePl,
      titleUk,
      materialUk,
      materialEn,
      materialPl,
      descriptionUk,
      descriptionEn,
      descriptionPl,
      this.arrFiles
    );

    this.productServ.postProduct(product).subscribe(() => {
      this.productGroup.reset();
      this.arrFiles = [];
      this.getProducts();
      Object.keys(this.productGroup.controls).forEach((key) => {
        this.productGroup.get(key)?.setErrors(null);
      });
    });
  }

  public updateProduct(): void {
    const {
      category,
      unitId,
      width,
      height,
      length,
      price,
      available,
      discountPercent,
      titleEn,
      titlePl,
      titleUk,
      discount,
      materialPl,
      materialEn,
      materialUk,
      descriptionEn,
      descriptionUk,
      descriptionPl,
    } = this.productGroup.value;
    const product: IProduct = new Product(
      category,
      unitId,
      width,
      height,
      length,
      price,
      available,
      discount,
      discountPercent || null,
      titleEn,
      titlePl,
      titleUk,
      materialUk,
      materialEn,
      materialPl,
      descriptionUk,
      descriptionEn,
      descriptionPl,
      this.arrFiles
    );
    this.productServ
      .updateProduct({ ...product, id: this.editingProductId })
      .subscribe(() => {
        this.productGroup.reset();
        this.arrFiles = [];
        this.isEditing = false;
        Object.keys(this.productGroup.controls).forEach((key) => {
          this.productGroup.get(key)?.setErrors(null);
        });
        this.getProducts();
      });
  }

  public deleteProduct(id: number): void {
    const deletingImages = this.productsArr.find((p) => p.id === id)?.images || [];
    this.productServ.deleteProduct(id).subscribe(() => {
      this.getProducts();
      this.deleteProductImages(deletingImages);
    });
  }

  public editProduct(product: IProduct): void {
    this.productGroup.setValue({
      unitId: product.unitId,
      category: product.category,
      titleEn: product.titleEn,
      titleUk: product.titleUk,
      titlePl: product.titlePl,
      descriptionPl: product.descriptionPl,
      descriptionUk: product.descriptionUk,
      descriptionEn: product.descriptionEn,
      materialEn: product.materialEn,
      materialPl: product.materialPl,
      materialUk: product.materialUk,
      price: product.price,
      discountPercent: product.discount ? product.discountPercent : '',
      discount: product.discount,
      available: product.available,
      width: product.width,
      length: product.length,
      height: product.height,
    });

    this.isEditing = true;
    this.editingProductId = product.id;
    this.arrFiles = product.images;
    this.changeIsDiscount();

    this.tabsIndex = 0;
  }

  public changeIsDiscount(): void {
    const { discount } = this.productGroup.value;
    if (discount) {
      this.productGroup.controls.discountPercent.enable();
    } else {
      this.productGroup.controls.discountPercent.disable();
    }
  }

  uploadFiles(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (this.arrFiles.length) {
      const fs = this.uploadService.uploadFiles(files);
      setTimeout(() => {
        for (const file of fs) {
          this.arrFiles.push(file);
        }
      }, 1300);
    } else {
      this.arrFiles = this.uploadService.uploadFiles(files);
    }
  }

  deleteImage(index: number): void {
    const delImage = this.arrFiles.find((_, i) => i === index);
    this.uploadService.deleteFile(delImage!?.Key, delImage!?.Bucket);
    this.arrFiles = this.arrFiles.filter((_, i) => i !== index);
  }

  deleteProductImages(images: IFileS3[]) {
    images.forEach((img) => {
      this.uploadService.deleteFile(img.Key, img.Bucket);
    });
  }
  public setTabs(event: number): void {
    this.tabsIndex = event;
  }

  ngOnDestroy(): void {
    if (this.unSubUploadFile) {
      this.unSubUploadFile.unsubscribe();
    }
  }
}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CategoriesService } from '../../shared/services/categories.service';
import { ICategory } from '../../shared/interfaces/category.interface';
import { TranslateService } from '@ngx-translate/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, AfterViewInit {
  // input values
  nameUk = '';
  namePl = '';
  nameEn = '';

  // array of categories
  categories: ICategory[] = [];

  // for table
  displayedColumns: string[] = ['categoryEn', 'categoryUk', 'categoryPl', 'edit', 'delete'];
  categorySource: MatTableDataSource<ICategory>;

  // for pagination
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  // flags
  isEdited: boolean | undefined;

  // others
  editingId: number | string | undefined;
  // lifecycle hooks
  constructor(
    private categoriesServ: CategoriesService,
    private translate: TranslateService
  ) {
    this.categorySource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getCategories();
    this.translate.setDefaultLang(localStorage.getItem('lang') || 'pl');
    this.categoriesServ.lang.subscribe(lan => {
      this.translate.setDefaultLang(lan);
      console.log('categories', lan);
    });
  }

  ngAfterViewInit(): void {
    this.categorySource.paginator = this.paginator || null;
  }

  // data methods
  addCategory(): void {
    if (this.checkForm()) {
      const category: ICategory = {
        categoryEn: this.nameEn,
        categoryPl: this.namePl,
        categoryUk: this.nameUk
      };

      this.categoriesServ.postCategory(category).subscribe(() => {
        this.clearForm();
        this.getCategories();
      });
    }
  }

  getCategories(): void {
    this.categoriesServ.getCategories().subscribe(data => {
      this.categories = data;
      // this.categoryForTranslate(data);
      this.categorySource = new MatTableDataSource<ICategory>(data);
      this.categorySource.paginator = this.paginator || null;
    });
  }

  updateCategory(): void {
    const updatedCategory: ICategory = {
      categoryEn: this.nameEn,
      categoryPl: this.namePl,
      categoryUk: this.nameUk,
      id: this.editingId
    };
    this.categoriesServ.updateCategory(updatedCategory).subscribe(() => {
      this.getCategories();
      this.isEdited = false;
      this.clearForm();
    });
  }

  deleteCategory(id: number | string): void {
    this.categoriesServ.deleteCategory(id).subscribe(() => {
      this.getCategories();
    });
  }
  // others methods
  editCategory(category: ICategory): void {
    this.editingId = category.id;
    this.isEdited = true;
    this.nameEn = category.categoryEn;
    this.namePl = category.categoryPl;
    this.nameUk = category.categoryUk;
  }

  private clearForm(): void {
    this.nameEn = '';
    this.namePl = '';
    this.nameUk = '';
  }
  private checkForm(): boolean {
    return this.nameEn.trim() && this.namePl.trim() && this.nameUk.trim() ? true : false;
  }

  // public convertToSnakeCase(str: string): string {
  //     return str.split(' ').join('_');
  // }

  // private categoryForTranslate(data: ICategory[]): void {
  //   const enCategories = new Map(data.map(v => ([[v.categoryEn.split(' ').join('_')], v.categoryEn])));
  //   const ukCategories = new Map(data.map(v => ([[v.categoryEn.split(' ').join('_')], v.categoryUk])));
  //   const plCategories = new Map(data.map(v => ([[v.categoryEn.split(' ').join('_')], v.categoryPl])));
  //   console.log(enCategories);
  //   this.translate.setTranslation('en', {
  //     categories: Object.fromEntries(enCategories)
  //   }, true);
  //   this.translate.setTranslation('uk', {
  //     categories: Object.fromEntries(ukCategories)
  //   }, true);
  //   this.translate.setTranslation('pl', {
  //     categories: Object.fromEntries(plCategories)
  //   }, true);
  // }

}

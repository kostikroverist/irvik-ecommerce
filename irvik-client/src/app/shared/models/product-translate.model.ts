import { IProduct } from '../interfaces/product.interface';
import { TranslateService } from '@ngx-translate/core';
export class ProductTranslate {
  constructor(private products: IProduct[], private translate: TranslateService) {}

  private translateMaterials(): void {
    const enMaterials = new Map(
      this.products.map((v) => [
        [v.materialEn.split(' ').join('_')],
        v.materialEn,
      ])
    );
    const ukMaterials = new Map(
      this.products.map((v) => [
        [v.materialEn.split(' ').join('_')],
        v.materialUk,
      ])
    );
    const plMaterials = new Map(
      this.products.map((v) => [
        [v.materialEn.split(' ').join('_')],
        v.materialPl,
      ])
    );
    this.translate.setTranslation(
      'en',
      {
        materials: Object.fromEntries(enMaterials),
      },
      true
    );
    this.translate.setTranslation(
      'uk',
      {
        materials: Object.fromEntries(ukMaterials),
      },
      true
    );
    this.translate.setTranslation(
      'pl',
      {
        materials: Object.fromEntries(plMaterials),
      },
      true
    );
  }

  private translateTitle(): void {
    const enTitle = new Map(
      this.products.map((v) => [[v.titleEn.split(' ').join('_')], v.titleEn])
    );
    const ukTitle = new Map(
      this.products.map((v) => [[v.titleEn.split(' ').join('_')], v.titleUk])
    );
    const plTitle = new Map(
      this.products.map((v) => [[v.titleEn.split(' ').join('_')], v.titlePl])
    );
    this.translate.setTranslation(
      'en',
      {
        title: Object.fromEntries(enTitle),
      },
      true
    );
    this.translate.setTranslation(
      'uk',
      {
        title: Object.fromEntries(ukTitle),
      },
      true
    );
    this.translate.setTranslation(
      'pl',
      {
        title: Object.fromEntries(plTitle),
      },
      true
    );
  }

  private translateDescription(): void {
    const enDescription = new Map(
      this.products.map((v) => [
        [v.titleEn.split(' ').join('_')],
        v.descriptionEn,
      ])
    );
    const ukDescription = new Map(
      this.products.map((v) => [
        [v.titleEn.split(' ').join('_')],
        v.descriptionUk,
      ])
    );
    const plDescription = new Map(
      this.products.map((v) => [
        [v.titleEn.split(' ').join('_')],
        v.descriptionPl,
      ])
    );
    this.translate.setTranslation(
      'en',
      {
        description: Object.fromEntries(enDescription),
      },
      true
    );
    this.translate.setTranslation(
      'uk',
      {
        description: Object.fromEntries(ukDescription),
      },
      true
    );
    this.translate.setTranslation(
      'pl',
      {
        description: Object.fromEntries(plDescription),
      },
      true
    );
  }

  public prepareToTranslate(): void {
    this.translateMaterials();
    this.translateTitle();
    this.translateDescription();
  }
}

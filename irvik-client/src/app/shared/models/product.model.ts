import { IProduct } from '../interfaces/product.interface';
import { IFileS3 } from '../interfaces/fileS3.interface';
export class Product implements IProduct {
  public totalPrice: number;
  public dateOfEdition: Date;
  public fullTextName: string | undefined;
  percent!: string;
  constructor(
    public category: string,
    public unitId: string,
    public width: string,
    public height: string,
    public length: string,
    public price: number,
    public available: boolean,
    public discount: boolean,
    public discountPercent: string | null,
    public titleEn: string,
    public titlePl: string,
    public titleUk: string,
    public materialUk: string,
    public materialEn: string,
    public materialPl: string,
    public descriptionUk: string,
    public descriptionEn: string,
    public descriptionPl: string,
    public images: IFileS3[],
    public count: number = 1,
  ) {
    this.checkPercent();
    this.totalPrice = this.getTotalPrice();
    this.dateOfEdition = new Date();
    this.convertFullTextName();
  }

  private getTotalPrice(): number {
    if (this.discountPercent) {
      return this.price - ((this.price * this.parse(this.percent)) / 100);
    } else {
      return this.price;
    }
  }

  private convertFullTextName(): void {
    this.fullTextName = this.category + this.unitId
      + this.width + this.height + this.length
      + this.descriptionEn + this.descriptionPl
      + this.descriptionUk + this.titleEn + this.titlePl + this.titleUk
      + this.materialEn + this.materialPl + this.materialUk + this.discountPercent || '';
  }
  private parse(str: string): number {
    if (typeof parseFloat(str) === 'number') {
      return parseFloat(str);
    } else {
      return 0;
    }
  }

  private checkPercent(): void {
    if (this.discount) {
      this.percent =
        this.discountPercent?.charAt(this.discountPercent.length - 1) ===
        '%'
          ? this.discountPercent
          : this.discountPercent + '%';
    }
  }
}

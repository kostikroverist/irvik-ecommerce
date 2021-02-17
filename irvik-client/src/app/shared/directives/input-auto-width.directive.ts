import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputAutoWidth]',
})
export class InputAutoWidthDirective {
  constructor(private elr: ElementRef) {
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ): void {
    const value = (event.target as HTMLInputElement).value;
    console.log(value);
    this.elr.nativeElement.style.width =
      (this.elr.nativeElement.value.length + 1) * 8 + 'px';
  }
}

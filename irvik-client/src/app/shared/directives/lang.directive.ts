import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLang]'
})
export class LangDirective {

  constructor(
    private el: ElementRef,
    private r: Renderer2,
  ) {
    if (el.nativeElement.value === localStorage.getItem('lang')) {
      el.nativeElement.checked = true;
    } else if (el.nativeElement.value === 'pl') {
      el.nativeElement.checked = true;
    }
  }

}

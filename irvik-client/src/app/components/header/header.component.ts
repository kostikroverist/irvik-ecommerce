import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CategoriesService } from '../../shared/services/categories.service';
import { LoginService } from '../../shared/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuth = false;
  constructor(
    public translate: TranslateService,
    private categoriesServ: CategoriesService,
    public loginService: LoginService
  ) { }

  ngOnInit(): void {
    const lang = localStorage.getItem('lang') || 'pl';
    this.translate.use(lang);
    this.translate.setDefaultLang(lang);
    this.changeLang(null, lang);
    if (localStorage.getItem('token')) {
      this.isAuth = this.loginService.isAuthenticated();
    }
    this.loginService.isAuth.subscribe(bol => this.isAuth = bol);
  }
  changeLang(e: Event | null, language?: string): void {
    let lang;
    if (e) {
      lang = (e.target as HTMLInputElement).value;
    } else {
      lang = language;
    }
    if (lang) {
      this.translate.use(lang);
      localStorage.setItem('lang', lang);
    }
    this.categoriesServ.lang.next(lang);
    if (e) {
      window.location.reload();
    }

  }
}

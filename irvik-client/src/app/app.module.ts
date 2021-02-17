// Core modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';

// Components and pages
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { BagComponent } from './pages/bag/bag.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { StoreComponent } from './pages/store/store.component';
import { ScrollBtnComponent } from './components/scroll-btn/scroll-btn.component';

// Angular materials modules
import { MatRippleModule } from '@angular/material/core';

// // Other libraries

import { LangDirective } from './shared/directives/lang.directive';
import { SwiperComponent } from './components/swiper/swiper.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { IvyGalleryModule } from 'angular-gallery';
import { LoginInterceptor } from './shared/interceptors/login.interceptor';
import { InputAutoWidthDirective } from './shared/directives/input-auto-width.directive';
// // root functions
// export function HttpLoaderFactory(http: HttpClient): any {
//   return new TranslateHttpLoader(http);
// }

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: LoginInterceptor
};


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SignInComponent,
    AboutUsComponent,
    BagComponent,
    FavoritesComponent,
    StoreComponent,
    ScrollBtnComponent,
    LangDirective,
    SwiperComponent,
    ProductDetailsComponent,
    InputAutoWidthDirective
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatRippleModule,
    IvyGalleryModule,
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}

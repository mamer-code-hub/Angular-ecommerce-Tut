import { Routes } from "@angular/router";
import { authResolver } from "../../core/resolvers/auth.resolver";
import { BrandProductsComponent } from "../brands/components/brand-products/brand-products.component";
import { BrandsComponent } from "../brands/components/brands/brands.component";
import { CartPageComponent } from "../cart/components/cart-page/cart-page.component";
import { CategoryProductsComponent } from "../products/components/category-products/category-products.component";
import { ProductDetailsComponent } from "../products/components/product-details/product-details.component";
import { ProductListComponent } from "../products/components/product-list/product-list.component";
import { HomeComponent } from "./components/home/home.component";
import { WishlistComponent } from "../wishlist/components/wishlist/wishlist.component";
import { CategoriesComponent } from "../categories/components/categories/categories.component";

export const homeRoutes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'wishlist', component: WishlistComponent, title: 'Wishlist' },
  { path: 'cart', component: CartPageComponent, title: 'Cart' },
  { path: 'products', component: ProductListComponent, title: 'Products' },
  { path: 'brands', component: BrandsComponent, title: 'Brands' },
  { path: 'categories', component: CategoriesComponent, title: 'Categories' },
  {
    path: 'details/:id',
    // loadComponent: () => import('../products/components/product-details/product-details.component').then(c => ProductDetailsComponent),
    component: ProductDetailsComponent,
    title: 'Details'
  },
  {
    path: 'brand/:id',
    // loadComponent: () => import('../products/components/product-details/product-details.component').then(c => ProductDetailsComponent),
    component: BrandProductsComponent, title: 'Brand'
  },
  {
    path: 'category/:id',
    // loadComponent: () => import('../products/components/category-products/category-products.component').then(c => CategoryProductsComponent),
    component: CategoryProductsComponent,
    title: 'Category'
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }

]

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { AuthGuard } from './guards/common/auth.guard';
import { HomeComponent } from './ui/components/home/home.component';
import { LayoutComponent as adminLayoutComponent } from './admin/layout/layout.component';
import { LayoutComponent as uiLayoutComponent } from './ui/layout/layout.component';

const routes: Routes = [
  {
    path:"admin", component: adminLayoutComponent, children:[
      {path:"", component: DashboardComponent},
      {path:"customer", loadChildren : () => import("./admin/components/customer/customer.module").then
      (module => module.CustomerModule), canActivate:[AuthGuard]},
      {path:"orders", loadChildren : () => import("./admin/components/order/order.module").then
      (module => module.OrderModule), canActivate:[AuthGuard]},
      {path:"products", loadChildren : () => import("./admin/components/products/products.module").then
      (module => module.ProductsModule), canActivate:[AuthGuard]},
      {path:"attributes", loadChildren : () => import("./admin/components/attribute/attribute.module").then
      (module => module.AttributeModule), canActivate:[AuthGuard]},
      {path:"product/:id/attribute", loadChildren : () => import("./admin/components/product-attribute/product-attribute.module").then
      (module => module.ProductAttributeModule), canActivate:[AuthGuard]},
      {path:"categories", loadChildren : () => import("./admin/components/category/category.module").then
      (module => module.CategoryModule), canActivate:[AuthGuard]},
      {path:"brands", loadChildren : () => import("./admin/components/brand/brand.module").then
      (module => module.BrandModule), canActivate:[AuthGuard]},
      {path:"sizes", loadChildren : () => import("./admin/components/size/size.module").then
      (module => module.SizeModule), canActivate:[AuthGuard]},
      {path:"authorize-menu", loadChildren : () => import("./admin/components/authorize-menu/authorize-menu.module").then
      (module => module.AuthorizeMenuModule), canActivate:[AuthGuard]},
      { path: "roles", loadChildren: () => import("./admin/components/role/role.module").then(module => module.RoleModule), canActivate: [AuthGuard] },
      { path: "users", loadChildren: () => import("./admin/components/user/user.module").then(module => module.UserModule), canActivate: [AuthGuard] },
    ], canActivate:[AuthGuard]
  },
  {path:"", component : HomeComponent},
  {path:"checkout", loadChildren : () => import("./ui/components/checkout/checkout.module").then
  (module => module.CheckoutModule)},
  ,{
    path:"", component: uiLayoutComponent, children:[
  {path:"products", loadChildren : () => import("./ui/components/products/products.module").then
  (module => module.ProductsModule)},
  {path:"products/:category/:pageNo", loadChildren : () => import("./ui/components/products/products.module").then
  (module => module.ProductsModule)},
  {path:"product/:Id", loadChildren : () => import("./ui/components/product-detail/product-detail.module").then
  (module => module.ProductDetailModule)},
  {path:"basket", loadChildren : () => import("./ui/components/baskets/baskets.module").then
  (module => module.BasketsModule)},
  {path:"my-account", loadChildren : () => import("./ui/components/profile/profile.module").then
  (module => module.ProfileModule)},
  {path:"about-us", loadChildren : () => import("./ui/components/about-us/about-us.module").then
  (module => module.AboutUsModule)},
  {path:"contact-us", loadChildren : () => import("./ui/components/contact-us/contact-us.module").then
  (module => module.ContactUsModule)},
  {path:"register", loadChildren : () => import("./ui/components/register/register.module").then
  (module => module.RegisterModule)},
  {path:"login", loadChildren : () => import("./ui/components/login/login.module").then
  (module => module.LoginModule)},
  { path: "password-reset", loadChildren: () => import("./ui/components/password-reset/password-reset.module").then(module => module.PasswordResetModule) },
  { path: "update-password/:userId/:resetToken", loadChildren: () => import("./ui/components/update-password/update-password.module").then(module => module.UpdatePasswordModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

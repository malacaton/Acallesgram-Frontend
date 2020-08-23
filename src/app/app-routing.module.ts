import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';
// import { TabsPageModule } from './pages/tabs/tabs.module';
// import { LoginPageModule } from './pages/login/login.module';
// import { LoginPageRoutingModule } from './pages/login/login-routing.module';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: './pages/tabs/tabs.module#TabsPageModule',
    // loadChildren: () => TabsPageModule,
    // loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    // // canActivate: [ UsuarioGuard ]
    canLoad: [ UsuarioGuard ]
  },
  // {
  //   path: 'login',
  //   loadChildren: () => LoginPageRoutingModule
  //   // loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  // },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  {
    path: '',
    pathMatch: 'full',  // ¿Qué es?
    redirectTo: 'main/tabs/tab1' // Redirige al main si no se especifica una ruta. Si no se está validado, esto llevará al Login
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

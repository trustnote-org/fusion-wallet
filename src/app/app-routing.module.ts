import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'welcome', loadChildren: './pages/welcome/welcome.module#WelcomePageModule' },
  { path: 'account', loadChildren: './pages/account/account.module#AccountPageModule' },
  { path: 'examples', loadChildren: './pages/examples/examples.module#ExamplesPageModule' },
  { path: 'faucet', loadChildren: './pages/faucet/faucet.module#FaucetPageModule' },
  { path: 'doc', loadChildren: './pages/doc/doc.module#DocPageModule' },
  { path: 'help', loadChildren: './pages/help/help.module#HelpPageModule' },
  { path: 'more', loadChildren: './pages/more/more.module#MorePageModule' },
  { path: 'setting', loadChildren: './pages/setting/setting.module#SettingPageModule' },
  { path: 'browser', loadChildren: './pages/browser/browser.module#BrowserPageModule' },
  { path: 'miniapp', loadChildren: './pages/miniapp/miniapp.module#MiniappPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

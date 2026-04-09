import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Catalog } from './pages/catalog/catalog';
import { FishDetail } from './pages/fish-detail/fish-detail';

export const routes: Routes = [
  { path: 'catalog', component: Catalog },
  { path: 'fish/:id', component: FishDetail },
  { path: '', redirectTo: '/catalog', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

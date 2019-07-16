import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { JetsonComponent } from "./jetson/jetson.component";
import { IndexComponent } from './index/index.component';

const routes: Routes = [
    {
        path: '',
        component: IndexComponent
    },

    {
        path: 'home',
        component: HomeComponent
    },

    {
        path:'jetson',
        component: JetsonComponent
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, JetsonComponent]
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { OversigtComponent } from './oversigt.component';
import { OversigtService } from '../../services/oversigt.service';

const routes: Routes = [
    {
        path     : '**', 
        component: OversigtComponent,
        resolve  : {
            data: OversigtService
        }
    }
];

@NgModule({
    declarations: [
        OversigtComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatTableModule,
        MatTabsModule,

        NgxChartsModule
    ],
    providers   : [
        OversigtService
    ]
})
export class OversigtModule
{
}


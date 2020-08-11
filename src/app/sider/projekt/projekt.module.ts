
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanRoutingModule } from './kanban/kanban-routing.module';
import { BoardsListComponent } from './kanban/boards-list/boards-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { KanbanBoardComponent } from './kanban/board/board.component';
import { FormsModule } from '@angular/forms';
import { BoardDialogComponent } from './kanban/dialogs/board-dialog.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TaskDialogComponent } from './kanban/dialogs/task-dialog.component';
import { DeleteButtonComponent } from './kanban/delete-button/delete-button.component';


@NgModule({
  declarations: [
    BoardsListComponent,
    KanbanBoardComponent,
    BoardDialogComponent,
    TaskDialogComponent,
    DeleteButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    KanbanRoutingModule,
    FormsModule,
    DragDropModule,
    MatDialogModule,
    MatButtonToggleModule,
  ],
  entryComponents: [BoardDialogComponent, TaskDialogComponent]
})
export class ProjektModule {}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { BoardDialogComponent } from './dialogs/board-dialog.component';
import { LektionService } from '../../../../services/lektion.service';
import { Lektion } from '../../../../model/lektion.model';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DeleteButtonComponent } from './delete-button/delete-button.component';

import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { AuthService } from '../../../../services/auth.service';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit, OnDestroy {

  boards: Lektion[];
  sub: Subscription;
  niveauid: any;
  pager = {
    index: 0,
    size: 1,
    count: 1
  };
 
 

  constructor(public lektionService: LektionService, public dialog: MatDialog,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private auth: AuthService) {}

  ngOnInit() {

    this.sub = this.lektionService
      .getUserQuestions()
      .subscribe(boards => (this.boards = boards));
  }



  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    this.lektionService.sortBoards(this.boards);
  }

  openBoardDialog(): void {
    const dialogRef = this.dialog.open(BoardDialogComponent, {
      width: '400px',
      data: {  }
    });

 

    dialogRef.afterClosed().subscribe(result => {
     
      if (result) {
        
        this.lektionService.createBoard({
          titel: result,  
        });
        
      }
  
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


 incrementString(str) {
    // Find the trailing number or it will match the empty string
    var count = str.match(/\d*$/);
  
    // Take the substring up until where the integer was matched
    // Concatenate it to the matched count incremented by 1
    return str.substr(0, count.index) + (++count[0]);
  };
}

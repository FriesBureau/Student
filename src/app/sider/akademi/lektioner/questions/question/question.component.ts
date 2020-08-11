import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { QuestionDialogComponent } from '../dialogs/question-dialog.component';
import { BoardDialogComponent } from '../dialogs/board-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LektionService } from '../../../../../services/lektion.service';
import { Lektion } from '../../../../../model/lektion.model';
import { AuthService } from '../../../../../services/auth.service';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  @Input() board;

  boards: Lektion[];

  svarDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.board.svar, event.previousIndex, event.currentIndex);
    this.lektionService.updateSvar(this.board.id, this.board.svar);
  }

  tjekSvar(svar?: Lektion, idx?: number): void {

    if(svar.korrektsvar == true) {
      alert('korrekt');
      const resultat = 1;

      this.lektionService.removeQuestion(this.board.trin)

      this.lektionService.createQuestion(svar.nexttrin);
      this.lektionService.opdaterResultat(this.board.trin, resultat );
    }
    else { 
      alert('forkert');
      const resultat = 0;
      this.lektionService.opdaterResultat(this.board.trin, resultat );
    }; 
  }

  openDialog(svar?: Lektion, idx?: number): void {
    const newQuestion = { label: 'purple' };
    const dialogRef = this.dialog.open(QuestionDialogComponent, {
      width: '500px',
      data: svar
        ? { svar: { ...svar }, isNew: false, boardId: this.board.trinid, idx }
        : { svar: newQuestion, isNew: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.isNew) {
          this.lektionService.updateSvar(this.board.trinid, [
            ...this.board.svar,
            result.svar
          ]);
        } else {
          const update = this.board.svar;
          update.splice(result.idx, 1, result.svar);
          this.lektionService.updateSvar(this.board.trinid, this.board.svar);
        }
      }
    });
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
     trin: this.incrementString(this.board.trinid)
  
        });
      }
  
    });
  }

  incrementString(str) {
    // Find the trailing number or it will match the empty string
    var count = str.match(/\d*$/);
  
    // Take the substring up until where the integer was matched
    // Concatenate it to the matched count incremented by 1
    return str.substr(0, count.index) + (++count[0]);
  };

  constructor(private lektionService: LektionService, private auth: AuthService,
    private dialog: MatDialog) {}
}

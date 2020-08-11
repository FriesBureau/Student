import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
  import { MatCardModule} from '@angular/material/card';
    import { MatInputModule} from '@angular/material/input';
      import { MatIconModule} from '@angular/material/icon';
        import { MatRadioModule } from '@angular/material/radio';
          import { MatDialogModule } from '@angular/material/dialog';
            import {  MatSnackBarModule } from '@angular/material/snack-bar';
            import {  MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  imports: [
    CommonModule,
    MatCardModule, MatButtonModule, MatInputModule, MatIconModule, 
    MatRadioModule, MatDialogModule, MatSnackBarModule, MatProgressBarModule
  ],
  exports:[ MatCardModule, MatButtonModule, MatInputModule, MatIconModule, MatRadioModule, 
    MatDialogModule, MatSnackBarModule, MatProgressBarModule],
  declarations: []
})
export class MaterialConfigModule { }

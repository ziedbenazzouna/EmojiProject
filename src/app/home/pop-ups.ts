import { Component, Input, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material"
import { DataService } from '../services/data.service';

@Component({
  selector: 'snack-bar-component-example-snack',
  template: "<span class='basic-snackbar'> Veuillez activer la webcam avant de commencer la partie </span>",
  styles: [`
    .basic-snackbar{
      color: primary;
    }
  `],
})
export class PreGameSnackBar{}



@Component({
  selector: 'dialog-overview-example-dialog',
  template:`
    <h1 mat-dialog-title>Débuter la partie?</h1>
    <div mat-dialog-content>
        <p>Vous devrez faire les emojis affichez à l'écran avec vos mains dans le carré spécifié, essayez d'avoir le
            meilleur temps possible!</p>
    </div>
    <div mat-dialog-actions>
        <button mat-button (click)="onNoClick()">Non</button>
        <button mat-button cdkFocusInitial (click)="startGame()">Oui</button>
    </div>
      ` ,
})
export class PreGameDialog{

  constructor(private data:DataService, public dialogRef: MatDialogRef<PreGameDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  startGame(){
    this.data.changeInGame(true);
    this.dialogRef.close();
  }
}


@Component({
  selector: 'dialog-overview-example-dialog',
  template:`
    <h1 mat-dialog-title>FIN DE LA PARTIE</h1>
    <div mat-dialog-content>
        <p>Le joueur {{ data.player }} gagne avec un temps de {{ data.time/1000 }} secondes</p>
    </div>
    <div mat-dialog-actions>
        <button mat-button (click)="onNoClick()">D'accord</button>
    </div>
      ` ,
})
export class EndGameDialog{
    constructor(public dialogRef: MatDialogRef<EndGameDialog>, @Inject(MAT_DIALOG_DATA) public data: any){}
  onNoClick(): void {
    this.dialogRef.close();
  }

}
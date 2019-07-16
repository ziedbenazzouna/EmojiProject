import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar} from "@angular/material"
import { DataService } from '../../services/data.service';
import { fade } from "../../animations"
import { PreGameDialog, PreGameSnackBar } from "../pop-ups"

@Component({
  selector: 'app-pre-game',
  templateUrl: './pre-game.component.html',
  styleUrls: ['./pre-game.component.scss'],
})
export class PreGameComponent implements OnInit {

  useStrokedEmoji3: boolean = true;
  useStrokedEmoji5: boolean = false;
  useStrokedEmoji7: boolean = false;
  useStrokedEmoji9: boolean = false;
  useStrokedPlayer1: boolean = true;
  useStrokedPlayer2: boolean = false;

  player2Active:boolean;
  webcamActive:boolean;
  numberEmojiTarget:number;


  constructor(private data: DataService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.data.currentPlayer2Active.subscribe(player2Active => this.player2Active = player2Active)
    this.data.numberEmojiTarget.subscribe(numberEmojiTarget => this.numberEmojiTarget = numberEmojiTarget)
    this.data.webcamActive.subscribe(webcamActive=> this.webcamActive=webcamActive)
    this.data.changeCurrentEmoji1(10);
    this.data.changeCurrentEmoji2(10);
    this.togglePlayer1();
    console.log("init pregame")
  }

  startGame(){
    this.data.changeInGame(true);
    console.log(this.webcamActive);
  }
  openSnackBar(){
    this.snackBar.openFromComponent(PreGameSnackBar, {
      duration: 5000,
    });
  }
  openDialog(): void {
    if (this.webcamActive) {

    
    const dialogRef = this.dialog.open(PreGameDialog, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('The dialog was closed');
    });
  } else {
    this.openSnackBar();
  }
  }


  toggleEmoji3() {
    this.useStrokedEmoji3 = true;
    this.useStrokedEmoji5 = false;
    this.useStrokedEmoji7 = false;
    this.useStrokedEmoji9 = false;
    this.data.changeNumberEmojiTarget(3);
  }
  toggleEmoji5() {
    this.useStrokedEmoji3 = false;
    this.useStrokedEmoji5 = true;
    this.useStrokedEmoji7 = false;
    this.useStrokedEmoji9 = false;
    this.data.changeNumberEmojiTarget(5);
  }
  toggleEmoji7() {
    this.useStrokedEmoji3 = false;
    this.useStrokedEmoji5 = false;
    this.useStrokedEmoji7 = true;
    this.useStrokedEmoji9 = false;
    this.data.changeNumberEmojiTarget(7);
  }
  toggleEmoji9() {
    this.useStrokedEmoji3 = false;
    this.useStrokedEmoji5 = false;
    this.useStrokedEmoji7 = false;
    this.useStrokedEmoji9 = true;
    this.data.changeNumberEmojiTarget(9);
  }
  togglePlayer1() {
    this.useStrokedPlayer1 = true;
    this.useStrokedPlayer2 = false;
    this.data.changePlayer2Active(false);
  }
  togglePlayer2() {
    this.useStrokedPlayer1 = false;
    this.useStrokedPlayer2 = true;
    this.data.changePlayer2Active(true);
  }


}
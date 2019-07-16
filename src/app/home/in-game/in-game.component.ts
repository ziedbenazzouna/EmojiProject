import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MatDialog } from '@angular/material';
import { EndGameDialog } from "../pop-ups"

@Component({
    selector: 'app-in-game',
    templateUrl: './in-game.component.html',
    styleUrls: ['./in-game.component.scss']
})
export class InGameComponent implements OnInit {
    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {

        if (event.key == "f" && this.inGame) {
            this.progressSequencePlayer1();
        }

        if (event.key == "g" && this.inGame) {
            this.progressSequencePlayer2();
        }
    }
    running: boolean = false;
    counter: number;
    success: boolean = true;
    timerRef;


    player2Active: boolean;
    numberEmojiTarget: number;
    successfulEmoji: boolean;

    activeEmojiPlayer1: number = 1;
    activeEmojiPlayer2: number = 1;
    currentLocalEmoji1: number;
    currentLocalEmoji2: number;
    currentDataEmoji1:  number;
    currentDataEmoji2:  number;
    currentMarkerPositionWithOffset1: number = (11 - this.numberEmojiTarget) / 2 + (this.activeEmojiPlayer1 - 1);
    currentMarkerPositionWithOffset2: number = (11 - this.numberEmojiTarget) / 2 + (this.activeEmojiPlayer2 - 1);


    player1Victory: boolean;
    player2Victory: boolean;

    emojiList: object[];
    markerList: object[];
    boxLocations: object;
    inGame: boolean = true;
    count: number= 0;

    constructor(private data: DataService, public dialog: MatDialog) {
    }

    ngOnInit() {
        this.data.numberEmojiTarget.subscribe(numberEmojiTarget => this.numberEmojiTarget = numberEmojiTarget)
        this.data.currentPlayer2Active.subscribe(player2Active => this.player2Active = player2Active)
        this.data.succesfulEmoji.subscribe(successfulEmoji => this.successfulEmoji = successfulEmoji)
        this.data.boxLocations.subscribe(boxLocations => this.boxLocations = boxLocations)
        this.data.currentEmoji1.subscribe(currentEmoji1 => {
            this.currentDataEmoji1 = currentEmoji1
            this.progressPlayer1();
            console.log('ss')
        })
        this.data.currentEmoji2.subscribe(currentEmoji2 =>{
             this.currentDataEmoji2 = currentEmoji2
             this.progressPlayer2();
            })
        this.createRandomBoxLocationPlayer1();
        this.createRandomBoxLocationPlayer2();
        this.startGame();
        this.createRandomEmojiList();
        this.updateMarkers();
        this.updateCurrentEmoji();


    }
    stopGame(player: number) {

        this.inGame = false;
        clearInterval(this.timerRef)
        this.data.changeInGame(false);
        const dialogRef = this.dialog.open(EndGameDialog, {
            width: '600px',
            data: { player: player, time: this.counter }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    progressSequencePlayer1() {
        this.createRandomBoxLocationPlayer1();
        this.activeEmojiPlayer1 += 1;
        this.updateMarkers();
        this.validateVictory();
        this.updateCurrentEmoji();
    }

    progressSequencePlayer2() {
        this.createRandomBoxLocationPlayer2();
        this.activeEmojiPlayer2 += 1;
        this.updateMarkers();
        this.validateVictory();
        this.updateCurrentEmoji();
    }

    async progressPlayer1() {
        if (await this.getEmojiState1()){
            this.progressSequencePlayer1();
        }
    }
    async progressPlayer2() {

        if (await this.getEmojiState2()){
            this.progressSequencePlayer2();
        }
    }
    async getEmojiState1() {
        if (this.currentDataEmoji1 === this.currentLocalEmoji1) {
            return true
        } else {
            return false
        }
    }
    async getEmojiState2() {
        if (this.currentDataEmoji2 === this.currentLocalEmoji2) {
            return true
        } else {
            return false
        }
    }
    validateVictory() {
        if (this.activeEmojiPlayer1 === this.numberEmojiTarget + 1) {
            this.stopGame(1);
        } else if (this.activeEmojiPlayer2 === this.numberEmojiTarget + 1) {
            this.stopGame(2);
        }
    }


    updateMarkers() {
        this.currentMarkerPositionWithOffset1 = (11 - this.numberEmojiTarget) / 2 + (this.activeEmojiPlayer1 - 1);
        this.currentMarkerPositionWithOffset2 = (11 - this.numberEmojiTarget) / 2 + (this.activeEmojiPlayer2 - 1);
        for (let i = 0; i < 11; i++) {
            if (this.currentMarkerPositionWithOffset1 == i) {
                this.markerList[i]['activePlayer1'] = true;
            } else {
                this.markerList[i]['activePlayer1'] = false;
            }
            if (this.currentMarkerPositionWithOffset2 == i) {
                this.markerList[i]['activePlayer2'] = true;
            } else {
                this.markerList[i]['activePlayer2'] = false;
            }

        }

    }

    createRandomEmojiList() {
        this.emojiList = [];
        this.markerList = []
        let lastEmoji = 99;
        let emojiNumber = 99;
        for (var i = 0; i < 11; i++) {
            let emoji = {};
            let marker = {};
            let emojiIsLikePreviousEmoji = true;
            while (emojiIsLikePreviousEmoji) {
                emojiNumber = Math.floor(Math.random() * 10);
                if (emojiNumber != lastEmoji) {
                    emojiIsLikePreviousEmoji = false;
                    lastEmoji = emojiNumber
                };
            }
            emoji['path'] = `assets/images/${emojiNumber}.png`;
            emoji['number'] = emojiNumber;

            if (this.numberEmojiTarget === 3) {
                if (i > 3 && i < 7) {
                    emoji['display'] = true;
                    marker['display'] = true;
                    marker["emojiNumber"] = emojiNumber;
                } else {
                    emoji['display'] = false;
                    marker['display'] = false;
                    marker["emojiNumber"] = emojiNumber;
                }
            }
            if (this.numberEmojiTarget === 5) {
                if (i > 2 && i < 8) {
                    emoji['display'] = true;
                    marker['display'] = true
                    marker["emojiNumber"] = emojiNumber;
                } else {
                    emoji['display'] = false;
                    marker['display'] = false;
                    marker["emojiNumber"] = emojiNumber;
                }
            }
            if (this.numberEmojiTarget === 7) {
                if (i > 1 && i < 9) {
                    emoji['display'] = true;
                    marker['display'] = true
                    marker["emojiNumber"] = emojiNumber;
                } else {
                    emoji['display'] = false;
                    marker['display'] = false
                    marker["emojiNumber"] = emojiNumber;
                }
            }
            if (this.numberEmojiTarget === 9) {
                if (i > 0 && i < 10) {
                    emoji['display'] = true;
                    marker['display'] = true;
                    marker["emojiNumber"] = emojiNumber;
                } else {
                    emoji['display'] = false;
                    marker['display'] = false;
                    marker["emojiNumber"] = emojiNumber;
                }
            }
            if ((11 - this.numberEmojiTarget) / 2 + (this.activeEmojiPlayer1 - 1) == i) {
                marker['activePlayer1'] = true;
            } else {
                marker['activePlayer1'] = false;
            }
            if ((11 - this.numberEmojiTarget) / 2 + (this.activeEmojiPlayer2 - 1) == i) {
                marker['activePlayer2'] = true;
            } else {
                marker['activePlayer2'] = false;
            }

            this.markerList.push(marker)
            this.emojiList.push(emoji)
        }
        this.updateMarkers();
    }

    startGame() {
        this.startChrono();
    }
    
    stopChrono() {
        clearInterval(this.timerRef);
    }

    startChrono() {
        this.running = !this.running;
        if (this.running) {
            const startTime = Date.now() - (this.counter || 0);
            this.timerRef = setInterval(() => {
                this.counter = Date.now() - startTime;
            });
        } else {
            clearInterval(this.timerRef);
        }
    }

    convertMillisecondsToSeconds(ms) {
        var seconds = Math.floor(ms / 1000) // 1 Second = 1000 Milliseconds
        var mseconds = ms % 1000
        return seconds + "." + mseconds
    };


    updateCurrentEmoji() {
        this.currentLocalEmoji1 = this.markerList[this.currentMarkerPositionWithOffset1]["emojiNumber"]
        this.currentLocalEmoji2 = this.markerList[this.currentMarkerPositionWithOffset2]["emojiNumber"]
    }

    randomIntFromInterval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    createRandomBoxLocationPlayer1() {
        const width = 640;
        const height = 480;
        const squareWidthAndHeight = 140;

        const minBoxXTotal: number = 0;
        const maxBoxXTotal: number = width - squareWidthAndHeight;
        const minBoxYTotal: number = 0;
        const maxBoxYTotal: number = height - squareWidthAndHeight;

        const minBoxXPlayer2: number = 0;
        const maxBoxXPlayer2: number = width / 2 - squareWidthAndHeight;
        const minBoxYPlayer2: number = 0;
        const maxBoxYPlayer2: number = height - squareWidthAndHeight;

        const minBoxXPlayer1: number = width / 2;
        const maxBoxXPlayer1: number = width - squareWidthAndHeight;
        const minBoxYPlayer1: number = 0;
        const maxBoxYPlayer1: number = height - squareWidthAndHeight;

        let modifiedBoxLocations: object;
        if (this.player2Active) {

            modifiedBoxLocations =  {
                "player1": [this.randomIntFromInterval(minBoxXPlayer1, maxBoxXPlayer1), this.randomIntFromInterval(minBoxYPlayer1, maxBoxYPlayer1)],
                "player2": [this.boxLocations["player2"][0], this.boxLocations["player2"][1]],
             }
        } else {
            modifiedBoxLocations = {
                "player1": [this.randomIntFromInterval(minBoxXTotal, maxBoxXTotal), this.randomIntFromInterval(minBoxYTotal, maxBoxYTotal)],
                "player2": [this.boxLocations["player2"][0], this.boxLocations["player2"][1]],
            }
        }
        this.data.changeBoxLocations(modifiedBoxLocations);
    }

    createRandomBoxLocationPlayer2() {
        const width = 640;
        const height = 480;
        const squareWidthAndHeight = 140;

        const minBoxXPlayer2: number = 0;
        const maxBoxXPlayer2: number = width / 2 - squareWidthAndHeight;
        const minBoxYPlayer2: number = 0;
        const maxBoxYPlayer2: number = height - squareWidthAndHeight;
        let modifiedBoxLocations: object;
        modifiedBoxLocations = {
            "player1": [this.boxLocations["player1"][0], this.boxLocations["player1"][1]],
            "player2": [this.randomIntFromInterval(minBoxXPlayer2, maxBoxXPlayer2), this.randomIntFromInterval(minBoxYPlayer2, maxBoxYPlayer2)]
        }
        this.data.changeBoxLocations(modifiedBoxLocations);
    }



}




import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor() { }

    private player2ActiveSource = new BehaviorSubject<boolean>(false);
    currentPlayer2Active = this.player2ActiveSource.asObservable();
    changePlayer2Active(active: boolean) {
        this.player2ActiveSource.next(active)
    }

    private numberEmojiTargetSource = new BehaviorSubject<number>(3);
    numberEmojiTarget = this.numberEmojiTargetSource.asObservable();
    changeNumberEmojiTarget(x: number) {
        this.numberEmojiTargetSource.next(x)
    }

    private inGameSource = new BehaviorSubject<boolean>(false);
    inGame = this.inGameSource.asObservable();
    changeInGame(active: boolean) {
        this.inGameSource.next(active)
    }
    private succesfulEmojiSource = new BehaviorSubject<boolean>(false);
    succesfulEmoji = this.succesfulEmojiSource.asObservable();
    changeSucessfulEmoji(active: boolean) {
        this.succesfulEmojiSource.next(active)
    }

    private currentEmojiSource1 = new BehaviorSubject<number>(10);
    currentEmoji1 = this.currentEmojiSource1.asObservable();
    changeCurrentEmoji1(x: number) {
        this.currentEmojiSource1.next(x);
    }

    private currentEmojiSource2 = new BehaviorSubject<number>(10);
    currentEmoji2 = this.currentEmojiSource2.asObservable();
    changeCurrentEmoji2(x: number) {
        this.currentEmojiSource2.next(x);
    }

    private boxLocationsSource = new BehaviorSubject<object>({
        "player1": [450, 50],
        "player2": [50, 50]
    });
    boxLocations = this.boxLocationsSource.asObservable();
    changeBoxLocations(x: object) {
        this.boxLocationsSource.next(x)
    }
    private webcamActiveSource = new BehaviorSubject<boolean>(false);
    webcamActive = this.webcamActiveSource.asObservable();
    changeWebcamActive(active: boolean) {
        this.webcamActiveSource.next(active)
    }

    private webcamElementSource = new BehaviorSubject<any>(null);
    webcamElement = this.webcamElementSource.asObservable();
    changeWebcamElement(webcamElem: any) {
        this.webcamElementSource.next(webcamElem)
    }
}
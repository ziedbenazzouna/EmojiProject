import { Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    @ViewChild("video", { static: true })
    public video: ElementRef;

    inGame:boolean = false;
    player2Active:boolean = false;

    constructor(private data: DataService) {
        this.data.inGame.subscribe(inGame => this.inGame = inGame)
    }

    public ngOnInit() { 
        this.data.currentPlayer2Active.subscribe(player2Active => this.player2Active = player2Active)   
        this.data.changeSucessfulEmoji(true);
    }

    public ngAfterViewInit() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
                this.video.nativeElement.srcObject = stream;
                this.video.nativeElement.play();
                this.data.changeWebcamElement(this.video.nativeElement);
                this.data.changeWebcamActive(true);
            });
        }

    }

}



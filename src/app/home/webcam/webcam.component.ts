import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { DataService } from "../../services/data.service";
import { fade } from "../../animations";
import * as tf from '@tensorflow/tfjs';
import { resolve } from 'q';

@Component({
    selector: 'app-webcam',
    templateUrl: './webcam.component.html',
    styleUrls: ['./webcam.component.scss'],
    animations: [fade]
})
export class WebcamComponent implements OnInit {
    @HostListener('document:keypress', ['$event'])
    async handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key == "p") {
            await this.predict()
        }

    }

    @ViewChild("canvas", { static: true })
    public canvas: ElementRef<HTMLCanvasElement>;
    private ctx: CanvasRenderingContext2D;

    @ViewChild("canvasLeft", { static: false })
    canvasLeft: ElementRef<HTMLCanvasElement>;
    ctxLeft: CanvasRenderingContext2D;

    @ViewChild("canvasRight", { static: false })
    canvasRight: ElementRef<HTMLCanvasElement>;
    ctxRight: CanvasRenderingContext2D;

    player2Active: boolean;
    inGame: boolean;
    detectionActive: boolean = false;
    detFrame;
    camFrame;
    boxLocations: object;
    webcamActive: boolean;
    webcamElement: any;
    boxImagesRight: ImageData;
    boxImagesLeft: ImageData;

    currentEmojiNumber1: number;
    currentEmojiNumber2: number;
    currentImgSource: string;
    model: tf.LayersModel;
    modelLoaded: boolean = false;

    player1PredictionsMemory: Array<number> = [];
    player2PredictionsMemory: Array<number> = [];

    player1Prediction: number = 10;
    player2Prediction: number = 10;

    constructor(private data: DataService) {}
    ngOnInit() {

        this.data.currentPlayer2Active.subscribe(player2Active => this.player2Active = player2Active);
        this.data.inGame.subscribe(inGame => {
            this.inGame = inGame
            if (this.inGame){
                this.detectionActive = true;
                this.predictAnimationFunction();
            } else {
                this.detectionActive = false;
                this.predictAnimationFunction();
            }
        });
        this.data.boxLocations.subscribe(boxLocations=> this.boxLocations=boxLocations)
        this.data.webcamActive.subscribe(webcamActive=> this.webcamActive=webcamActive)
        this.data.currentEmoji1.subscribe(currentEmoji => this.currentEmojiNumber1= currentEmoji)
        this.data.currentEmoji2.subscribe(currentEmoji => this.currentEmojiNumber2= currentEmoji)
        this.data.webcamElement.subscribe(webcamElement => this.webcamElement = webcamElement);
        // this.waitDetection()
        this.loadModel();

    }

    async predictAnimationFunction() {
        if (this.modelLoaded && this.webcamActive && this.detectionActive) {
            await this.predict()
            this.detFrame = window.requestAnimationFrame(() => this.predictAnimationFunction());
        } else if (this.webcamActive && this.modelLoaded && !this.detectionActive) {
           Promise.resolve().then(() => cancelAnimationFrame(this.detFrame))

        }

    }

    ngAfterViewInit() {

        this.ctx = this.canvas.nativeElement.getContext('2d');
        this.camFrame = window.requestAnimationFrame(() => this.webcamAnimationFunction());
        this.detFrame = window.requestAnimationFrame(() => this.predictAnimationFunction());
        console.log("Launched detection")
    }

    async loadModel() {
        this.model = await tf.loadLayersModel('../../assets/model.json');
        this.modelLoaded = true
        console.log("model loaded");
    }

    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    

    async predict() {
        let argMaxP1 = tf.tidy(() => {
            let scalerTensor = tf.scalar(255);
            let originalImgP1 = tf.browser.fromPixels(this.boxImagesLeft);
            let bgrImageP1 = tf.reverse(originalImgP1, -1);
            let predictBgrImageP1 = bgrImageP1.reshape([1, 140, 140, 3]);
            predictBgrImageP1 = tf.cast(predictBgrImageP1, 'float32');
            predictBgrImageP1 = tf.div(predictBgrImageP1, scalerTensor);
            let outputP1 = this.model.predict(predictBgrImageP1) as tf.Tensor;
            return outputP1.argMax(1);
        });

        let resultP1 = await argMaxP1.data()
        argMaxP1.dispose()
        this.player1PredictionsMemory.push(resultP1[0])

        if(this.player2Active){
            let argMaxP2 = tf.tidy(() => {
                let scalerTensor = tf.scalar(255);
                let outputP2:tf.Tensor;
                let originalImgP2 = tf.browser.fromPixels(this.boxImagesRight);
                let bgrImageP2 = tf.reverse(originalImgP2, -1);
                let predictBgrImageP2 = bgrImageP2.reshape([1, 140, 140, 3]);
                predictBgrImageP2 = tf.cast(predictBgrImageP2, 'float32');
                predictBgrImageP2 = tf.div(predictBgrImageP2, scalerTensor);

                outputP2 = this.model.predict(predictBgrImageP2) as tf.Tensor; 
                return outputP2.argMax(1);
            });

            let resultP2 = await argMaxP2.data()
            argMaxP2.dispose()
            this.player2PredictionsMemory.push(resultP2[0])
        } 

        console.log(tf.memory());

        if (this.player1PredictionsMemory.length > 5){
            this.player1PredictionsMemory.shift();
            let exportedEmojiNumber = Number(this.findMode(this.player1PredictionsMemory))
            if (exportedEmojiNumber != this.currentEmojiNumber1)
            this.data.changeCurrentEmoji1(exportedEmojiNumber);
        }
        if (this.player2PredictionsMemory.length > 5){
            this.player2PredictionsMemory.shift();
            let exportedEmojiNumber = Number(this.findMode(this.player2PredictionsMemory));
            if (exportedEmojiNumber != this.currentEmojiNumber2)
            this.data.changeCurrentEmoji2(exportedEmojiNumber);
        }


    }

    findMode(numbers) {
        let counted = numbers.reduce((acc, curr) => { 
            if (curr in acc) {
                acc[curr]++;
            } else {
                acc[curr] = 1;
            }
            return acc;
        }, {});
        let mode = Object.keys(counted).reduce((a, b) => counted[a] > counted[b] ? a : b);
        return mode;
    }

    webcamAnimationFunction() {
        if (this.webcamActive) {
            this.ctx.drawImage(this.webcamElement, 0, 0, 640, 480);

            this.boxImagesLeft = this.ctx.getImageData(this.boxLocations["player1"][0],
                this.boxLocations["player1"][1],
                140, 140);
            this.boxImagesRight = this.ctx.getImageData(this.boxLocations["player2"][0],
                this.boxLocations["player2"][1],
                140, 140);

            this.ctx.beginPath();
            this.ctx.rect(this.boxLocations["player1"][0], this.boxLocations["player1"][1], 140, 140);
            this.ctx.lineWidth = 5;
            this.ctx.strokeStyle = 'red';
            this.ctx.stroke();
            if (this.player2Active) {
                this.ctx.drawImage(this.canvas.nativeElement, 0, 0, 640, 480);
                this.ctx.beginPath();
                this.ctx.rect(this.boxLocations["player2"][0], this.boxLocations["player2"][1], 140, 140);
                this.ctx.lineWidth = 5;
                this.ctx.strokeStyle = 'blue';
                this.ctx.stroke();
            }
        }
        window.requestAnimationFrame(() => this.webcamAnimationFunction());
    }

    // async waitDetection() {
    //     if(!this.inGame) this.data.inGame.subscribe(()=> this.predictAnimationFunction());
    // }

    // // async getPredictions(inGame: boolean) {
    // //     if (await inGame) {
    // //         window.requestAnimationFrame(() => this.predictAnimationFunction());
    // //         console.log("lol")
    // //     }
    // }

}

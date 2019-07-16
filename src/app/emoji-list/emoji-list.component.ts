import { Component, OnInit } from '@angular/core';
import { fadeInList, fade } from "../animations"
@Component({
  selector: 'app-emoji-list',
  templateUrl: './emoji-list.component.html',
  styleUrls: ['./emoji-list.component.scss'],
  animations: [fadeInList, fade]
})
export class EmojiListComponent implements OnInit {

  emojiList: object[] = [
    {
    "emoji": "Ceci est l'emoji paix!",
    "path": "assets/images/0.png"
    },
    {
    "emoji": "Ceci est l'emoji metal!",
    "path": "assets/images/1.png"
    },
    {
    "emoji": "Ceci est l'emoji sur-la-coche!",
    "path": "assets/images/2.png"
    },
    {
    "emoji": "Ceci est l'emoji pointer à gauche!",
    "path": "assets/images/3.png"
    },
    {
    "emoji": "Ceci est l'emoji pointer à droite!",
    "path": "assets/images/4.png"
    },
    {
    "emoji": "Ceci est l'emoji pointer en haut!",
    "path": "assets/images/5.png"
    },
    {
    "emoji": "Ceci est l'emoji pointer en bas!",
    "path": "assets/images/6.png"
    },
    {
    "emoji": "Ceci est l'emoji main!",
    "path": "assets/images/7.png"
    },
    {
    "emoji": "Ceci est l'emoji spok!",
    "path": "assets/images/8.png"
    },
    {
    "emoji": "Ceci est l'emoji rad!",
    "path": "assets/images/9.png"
    },
];
  constructor() { }

  ngOnInit() {
    console.log("init emoji-list")
  }

}

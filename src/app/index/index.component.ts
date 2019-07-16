import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { fadeInIndex1, fadeInIndex2, fadeInIndex3, fadeInIndex4, fadeInButton, fadeInOut, fadeAnimation } from '../animations'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [
    fadeInIndex1,
    fadeInIndex2,
    fadeInIndex3,
    fadeInIndex4,
    fadeInButton,
    fadeInOut,
    fadeAnimation,
  ]
})
export class IndexComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  testingAnimations:boolean= true; 
  onClick() {
    setTimeout(()=>{
   this.router.navigate(["home"]);
    }, 2000)

    this.testingAnimations = false;
  }

}

import { Component } from '@angular/core';
import { fadeAnimation } from './animations';
import { RouterOutlet } from "@angular/router"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fadeAnimation
  ]
})
export class AppComponent {
  title = 'EmojiProject';
  testShadow = true;
  public prepareRoute(outlet: RouterOutlet) {
  return outlet.isActivated ? outlet.activatedRoute : '';
}
}

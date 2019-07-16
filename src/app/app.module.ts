import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule, MatCheckboxModule, MatCardModule, MatSidenavModule, MatIconModule, MatToolbarModule, MatDialogModule, MatSnackBarModule} from "@angular/material"
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list'; 
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs'; 
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NavbarComponent } from './navbar/navbar.component';
import { EmojiListComponent } from './emoji-list/emoji-list.component';
import { IndexComponent } from './index/index.component';
import { WebcamComponent } from './home/webcam/webcam.component';
import { PreGameComponent} from './home/pre-game/pre-game.component';
import { InGameComponent } from './home/in-game/in-game.component';
import { PreGameDialog, PreGameSnackBar, EndGameDialog } from "./home/pop-ups";

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavbarComponent,
    EmojiListComponent,
    IndexComponent,
    WebcamComponent,
    PreGameComponent,
    InGameComponent,
    PreGameDialog,
    PreGameSnackBar,
    EndGameDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatGridListModule,
    MatDividerModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  exports: [
    NavbarComponent,
    EmojiListComponent,
    IndexComponent,
    WebcamComponent,
    PreGameComponent,
    InGameComponent,
  ],
  entryComponents: [PreGameDialog, PreGameSnackBar, EndGameDialog],

  providers: [PreGameComponent],

  bootstrap: [AppComponent]
})
export class AppModule { }

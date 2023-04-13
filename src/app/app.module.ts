import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { QuizComponent } from './components/quiz/quiz.component';
import { GameOverComponent } from './components/game-over/game-over.component';
import { GameLoadingComponent } from './components/game-loading/game-loading.component';
import { GameBackgroundComponent } from './components/game-background/game-background.component';
import { GameNetworkErrorComponent } from './components/game-network-error/game-network-error.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    GameBackgroundComponent,
    GameOverComponent,
    GameNetworkErrorComponent,
    GameLoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

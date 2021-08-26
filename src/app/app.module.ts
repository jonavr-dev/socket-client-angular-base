import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import {environment} from '../environments/environment';
import { FooterComponent } from './components/footer/footer.component';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import {HttpClientModule} from '@angular/common/http';
import { CommentsComponent } from './components/comments/comments.component';

const config: SocketIoConfig = {
  url: environment.wsUrl, options: { transports: ['websocket', 'polling'] }
};

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    DashboardComponent,
    UsersListComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

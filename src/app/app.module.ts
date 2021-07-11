import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import {environment} from '../environments/environment';
import { FooterComponent } from './components/footer/footer.component';
import { ChatComponent } from './components/chat/chat.component';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import {AppRoutingModule} from './app-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactionsComponent } from './components/reactions/reactions.component';
import {HttpClientModule} from '@angular/common/http';

const config: SocketIoConfig = {
  url: environment.wsUrl, options: { transports: ['websocket', 'polling'] }
};

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ChatComponent,
    LoginComponent,
    DashboardComponent,
    UsersListComponent,
    HeaderComponent,
    ReactionsComponent
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

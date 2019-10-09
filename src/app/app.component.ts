import { Component, OnInit } from '@angular/core';
import {NgxMqttLiteService} from 'ngx-mqtt-lite';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'pachis';
  vibracion = 'Terremoto';
  gas = 'Quemando';
  constructor(private ngxMqttLiteService: NgxMqttLiteService) {
    
  }

  ngOnInit() {
    this.ngxMqttLiteService.initializa('ws://192.168.25.251/ws', {
      username: 'guest',
      password: 'guest',
      port: 15672,
      keepalive: 15
    });
    this.ngxMqttLiteService.scope().subscribe(client => {
      client.subscribe('home_out');
    });
    this.ngxMqttLiteService.listen('message').subscribe(data => {
      console.log(data[1].toString());
    });
  }

}

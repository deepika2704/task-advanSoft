import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hello-greets',
  templateUrl: './hello-greets.component.html',
  styleUrls: ['./hello-greets.component.css']
})
export class HelloGreetsComponent {

  constructor(private location: Location) { }
  goBack() {
    this.location.back();
  }
}

import { Component } from '@angular/core';
import {environment} from "../environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Deezy';

  constructor (private rooter: Router) {
  }

}

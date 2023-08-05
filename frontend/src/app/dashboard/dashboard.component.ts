import { Component } from '@angular/core';
import {Router} from "@angular/router";
import axios from "axios";
import {environment} from "../../environment";
import {UserDataInterface} from "./user-data-interface";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router: Router) {}

  userData: UserDataInterface | null = null;

  inter: any;
  ngOnInit() {
    this.inter = setInterval(() => {
      axios.get(`${environment.backURL}/is-log`, {withCredentials: true}).then(payload => {
      }).catch(err => this.router.navigate(['/home']));
    }, 2000);
    axios.get(`${environment.backURL}/get-user-data`, {withCredentials: true}).then(payload => {
      this.userData = payload.data;
    }).catch(err => this.router.navigate(['/home']));

  }

  ngOnDestroy() {

  }
}

import { Component } from '@angular/core';
import {environment} from "../../environment";
import axios from "axios"
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) {
  }
  ngOnInit() {
    axios.get(`${environment.backURL}/is-log`, {withCredentials: true}).then(payload => {
      //console.log(payload);
      if (payload?.data == true) {
        this.router.navigate(['/dashboard']);
      }
    }).catch(err => {});
  }
    authDeezer() {
    const link = `https://connect.deezer.com/oauth/auth.php?app_id=${environment.deezerID}&redirect_uri=${environment.deezerRedirect}&perms=basic_access,email`
    window.location.href = link;
  }
}

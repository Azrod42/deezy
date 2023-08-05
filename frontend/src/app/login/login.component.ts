import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import axios from "axios";
import {environment} from "../../environment";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    axios.get(`${environment.backURL}/is-log`, {withCredentials: true}).then(payload => {
      //console.log(payload);
      if (payload?.data == true) {
        this.router.navigate(['/dashboard']);
      }
    }).catch(err => {});
    const code = this.route.snapshot.queryParamMap.get('code');
    axios.post(`${environment.backURL}/login`, {code: code}, {withCredentials: true}).then(res => {
      if (res.data?.status == false) {
        this.router.navigate(['/home']);
      } else if (res.data?.status == true) {
        this.router.navigate(['/dashboard']);
      }
    }).catch(err => {});
  }

}

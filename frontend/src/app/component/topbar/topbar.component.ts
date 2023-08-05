import {Component, Input} from '@angular/core';
import {UserDataInterface} from "../../dashboard/user-data-interface";
import axios from "axios";
import {environment} from "../../../environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {

  constructor(private router: Router) {
  }

  @Input() userData: UserDataInterface | null = null;
  ngOnInit() {
    // console.log(this.userData);
  }

  async onClick() {
    await axios.get(`${environment.backURL}/logout`, {withCredentials: true});
    this.router.navigate(['/dashboard']);
  }

  }

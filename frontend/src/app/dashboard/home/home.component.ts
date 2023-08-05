import {Component, Inject, Input} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import axios from "axios";
import {environment} from "../../../environment";
import {Router} from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponentD {

  constructor(private router: Router) {}


  @Input() searchData: any[] = [];
  async onSearch(input: string) {
    let inputEl = (<HTMLInputElement>document.getElementById("inputSearch"));
    if (inputEl)
      inputEl.value = '';
    if (input !== '') {
      const searchResult = await axios.post(`${environment.backURL}/search`, {input} ,{withCredentials: true});
      const data = searchResult.data.data
      //console.log(searchResult);
      if (data) {
        this.searchData = [];
        for (let i = 0; data[i]; i++) {
          this.searchData.push({title: data[i]?.title, artist: data[i]?.artist.name, duration: data[i]?.duration, id: data[i]?.id.toString()});
        }
        //console.log(this.searchData);
      }
    }
  }

  onClickSound(id: string) {
    //console.log(id);
    this.router.navigate([`/dashboard/song/${id}`])
  }

  protected readonly Math = Math;
}

export interface inputData {
  search: string;
}

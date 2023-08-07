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
  @Input() trending: any[] | null = null;

  trendingData: any[] | null = null;
  breakpoint: any = 1;

  async ngOnInit() {
    this.breakpoint = (window.innerWidth <= 430) ? 1 : 2;
    let data: any = await axios.get(`${environment.backURL}/trending`, {withCredentials: true});
    if (data) {
      data = data?.data;
      const trendingList = [];
      for (let i = 0; i < 10; i++) {
        trendingList.push({
          id: data?.tracks.data[i]['id'],
          title: data?.tracks.data[i]['title'],
          img: data?.tracks.data[i]['album']['cover_medium'],
          artist: data?.tracks.data[i]['artist']['name']
        })
        this.trendingData = trendingList;
        this.trending = trendingList;
      }
    }
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 430) ? 1 : 2;
  }

  async onSearch(input: string) {
    let inputEl = (<HTMLInputElement>document.getElementById("inputSearch"));
    if (inputEl)
      inputEl.value = '';
    if (input !== '') {
      const searchResult = await axios.post(`${environment.backURL}/search`, {input} ,{withCredentials: true});
      const data = searchResult.data.data
      if (data) {
        this.trending = null;
        this.searchData = [];
        for (let i = 0; data[i]; i++) {
          this.searchData.push({title: data[i]?.title, artist: data[i]?.artist.name, duration: data[i]?.duration, id: data[i]?.id.toString()});
        }
      }
    } else {
      this.searchData = [];
      this.trending = this.trendingData;
    }
  }

  onClickSound(id: string) {
    this.router.navigate([`/dashboard/song/${id}`])
  }

  protected readonly Math = Math;
}

export interface inputData {
  search: string;
}

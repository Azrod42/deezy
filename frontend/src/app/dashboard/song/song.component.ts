import {Component, Input} from '@angular/core';
import axios from "axios";
import {environment} from "../../../environment";
import {ActivatedRoute, Router} from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { Pipe, PipeTransform} from "@angular/core";




@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})

export class SongComponent implements PipeTransform {
  constructor(private sanitizer: DomSanitizer, private router: Router) { }
  transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  songData: any | null = null;

  onClickReturn() {
    this.router.navigate(['/home'])
  }

  async ngOnInit() {
    const id = this.router.url.split('/').pop()!;
    let idApi= 'https://widget.deezer.com/widget/dark/track/' +this.router.url.split('/').pop()!;
    const html:string =`<iframe title="deezer-widget" src="${idApi}" width="90%" height="300" frameborder="0" allowtransparency="true" allow="encrypted-media; clipboard-write"></iframe>`;
    const docEl = document.getElementById('iframeDiv');
    if (docEl)
      docEl.innerHTML = html;
    const songApi = await axios.post(`${environment.backURL}/song`, {id}, {withCredentials: true});
    if (songApi.data.error) {
      this.router.navigate(['/dashboard/home']);
    } else {
      const data = songApi.data;
      this.songData = data;
      //console.log(data);
    }
  }

  protected readonly Math = Math;
}

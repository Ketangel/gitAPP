import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Giphy } from '../interfaces/giphy.interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private http = inject(HttpClient)
  

  constructor(){
    this.loadTrendingGifs()
  }

  loadTrendingGifs(){
    this.http.get<Giphy>(`${environment.gifsUrls}/gifs/trending`, {
      params:{
        api_key: environment.apiKeys,
        limit:20,
      },
    }).subscribe( (resp)  => { console.log({resp}) });

  }

}

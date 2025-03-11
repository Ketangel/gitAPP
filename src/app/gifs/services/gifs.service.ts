import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import type { Giphy } from '../interfaces/giphy.interfaces';
import { environment } from '../../../environments/environment';
import { Gif } from '../interfaces/gif.intefaces';
import { GifMapper } from '../mapper/gif.mapper';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private http = inject(HttpClient)
  
  trendinGifs = signal<Gif[]>([]);
  tredingGifsLoading = signal(true);

  constructor(){
    this.loadTrendingGifs()
  }

  loadTrendingGifs(){
    this.http.get<Giphy>(`${environment.gifsUrls}/gifs/trending`, {
      params:{
        api_key: environment.apiKeys,
        limit:20,
      },
    }).subscribe( (resp)  => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendinGifs.set(gifs);
      this.tredingGifsLoading.set(false);
      console.log(gifs)
    });

  }

}

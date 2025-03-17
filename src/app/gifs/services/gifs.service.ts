import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import type { Giphy } from '../interfaces/giphy.interfaces';
import { environment } from '../../../environments/environment';
import { Gif } from '../interfaces/gif.intefaces';
import { GifMapper } from '../mapper/gif.mapper';
import { map, take, tap } from 'rxjs';


const loadFromLocalStorage = () => {
  const history = localStorage.getItem('history');
  return history ? JSON.parse(history) : {};
}

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private http = inject(HttpClient)
  
  trendinGifs = signal<Gif[]>([]);
  tredingGifsLoading = signal(true);

  //historial y cache de busqueda
  searchHistory = signal<Record<string,Gif[]>>(loadFromLocalStorage());
  searchHistoryKey = computed( () => Object.keys(this.searchHistory()))

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


  searchTrendingGifs(query:string){
   return this.http.get<Giphy>(`${environment.gifsUrls}/gifs/search`, {
      params:{
        api_key: environment.apiKeys,
        limit:20,
        q: query
      },
    }) .pipe(
        map( ( ({data}) =>   GifMapper.mapGiphyItemsToGifArray(data))),
        
        //historial
        tap(item => {
          this.searchHistory.update(history => ({
            ...history,
            [query.toLowerCase()]: item
          }));
        })
    )
    // .subscribe( (resp)  => {
    //   const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
    //   console.log(gifs);
    // });
  }


  getHistoryGifs(query:string):Gif[]{
    return this.searchHistory()[query] ?? []
  }


  saveLocalStorage = effect( () => {
    localStorage.setItem('history',JSON.stringify(this.searchHistory()))
  })

}


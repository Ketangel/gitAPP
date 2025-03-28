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
  tredingGifsLoading = signal(false);

  private tredingPage = signal(0);

  trendinGifsGroup = computed<Gif[][]>( () => {
    const groups = [];
    for(let i = 0; i <  this.trendinGifs().length; i += 3){
      groups.push( this.trendinGifs().slice(i, i + 3) );
    }
    return groups;
  })

  //historial y cache de busqueda
  searchHistory = signal<Record<string,Gif[]>>(loadFromLocalStorage());
  searchHistoryKey = computed( () => Object.keys(this.searchHistory()))

  constructor(){
    this.loadTrendingGifs()
  }

  loadTrendingGifs(){
    if( this.tredingGifsLoading() ) return
    this.tredingGifsLoading.set(true);

    this.http.get<Giphy>(`${environment.gifsUrls}/gifs/trending`, {
      params:{
        api_key: environment.apiKeys,
        limit:20,
        offset:this.tredingPage()  * 20,
      },
    }).subscribe( (resp)  => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendinGifs.update( (current) => [...current,...gifs]);
      this.tredingPage.update( (pageActual) => pageActual + 1);
      this.tredingGifsLoading.set(false);
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


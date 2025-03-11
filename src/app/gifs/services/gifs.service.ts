import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import type { Giphy } from '../interfaces/giphy.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private http = inject(HttpClient)
  
  loadTrendingGifs(){
    this.http.get<Giphy>(`${environment.gifsUrl}/gifs/trending`, {
      params:{
        api_key: environment.apiKey,
        limit:20,
      }

    }).subscribe( (resp)  => {

        console.log(resp)
    })

  }

}

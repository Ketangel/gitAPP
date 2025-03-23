import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.intefaces';

@Component({
  selector: 'app-search-page',
  imports: [GifsListComponent],
  templateUrl: './search-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export  default class SearchPageComponent {

  gifServices = inject(GifsService)
  gifs = signal<Gif[]>([]);

  onSearch(query:string){
    if(!query){return}
    this.gifServices.searchTrendingGifs(query).subscribe( resp =>  this.gifs.set(resp))
  }

 }

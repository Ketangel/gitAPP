import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-search-page',
  imports: [GifsListComponent],
  templateUrl: './search-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export  default class SearchPageComponent {

  gifServices = inject(GifsService)

  onSearch(query:string){
    if(!query){return}
    
    this.gifServices.searchTrendingGifs(query)
  }

 }

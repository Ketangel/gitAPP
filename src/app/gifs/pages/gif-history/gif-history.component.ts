import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifsService } from '../../services/gifs.service';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";

@Component({
  selector: 'app-gif-history',
  imports: [GifsListComponent],
  templateUrl: './gif-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GifHistoryComponent { 
  
  gifServices = inject(GifsService)
  // detecta cambios de los parametros de las rutas
  //forma 1
  // query = inject(ActivatedRoute).params.subscribe()
  //forma 2 
  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map( params => params['query'])
    )
  );

  gifsBykey = computed(()=>  this.gifServices.getHistoryGifs(this.query()))
}



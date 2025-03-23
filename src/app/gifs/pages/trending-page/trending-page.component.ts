import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { ScrollStateService } from '../../../shared/services/scrol-state.service';


@Component({
  selector: 'app-trending-page',
  // imports: [GifsListComponent],
  templateUrl: './trending-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrendingPageComponent  implements AfterViewInit{
 
  gifsServices = inject(GifsService);
  scrollStateServices = inject(ScrollStateService)

  //viewChild - Tomar referencias del template
  scrollDivRef  = viewChild<ElementRef>('groupDiv');


  ngAfterViewInit(): void {
    
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return

    scrollDiv.scrollTop = this.scrollStateServices.trendingScrollState()
  }


  onScroll($event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return
    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight  = scrollDiv.scrollHeight;
    // console.log({scrollTop, clientHeight,scrollHeight})

    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;
    
    this.scrollStateServices.trendingScrollState.set(scrollTop)

    if(isAtBottom){
      this.gifsServices.loadTrendingGifs();
    }


  } 
    
}

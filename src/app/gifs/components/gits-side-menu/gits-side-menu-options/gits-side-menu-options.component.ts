import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuOption } from '../../../interfaces/menu-option.interfaces';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-gits-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './gits-side-menu-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GitsSideMenuOptionsComponent { 


  menuOptions: MenuOption[] = [
    {
      label: 'Trending',
      subLabel: 'Gifs Populares',
      router: '/dashboard/treading',
      icon: 'fa-solid fa-chart-line'
    },
    {
      label: 'Search',
      subLabel: 'Buscar Gifs',
      router: '/dashboard/search',
      icon: 'fa-solid fa-magnifying-glass'
    }
  ]

}

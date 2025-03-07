import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GitsSideMenuComponent } from "../../components/gits-side-menu/gits-side-menu.component";

@Component({
  selector: 'app-dasboard-page',
  imports: [RouterOutlet, GitsSideMenuComponent],
  templateUrl: './dasboard-page.component.html',
})
export default class DasboardPageComponent { }

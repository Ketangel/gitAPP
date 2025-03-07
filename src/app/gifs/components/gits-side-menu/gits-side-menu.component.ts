import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GitsSideMenuHeaderComponent } from "./gits-side-menu-header/gits-side-menu-header.component";
import { GitsSideMenuOptionsComponent } from "./gits-side-menu-options/gits-side-menu-options.component";

@Component({
  selector: 'app-gits-side-menu',
  imports: [GitsSideMenuHeaderComponent, GitsSideMenuOptionsComponent],
  templateUrl: './gits-side-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GitsSideMenuComponent { }

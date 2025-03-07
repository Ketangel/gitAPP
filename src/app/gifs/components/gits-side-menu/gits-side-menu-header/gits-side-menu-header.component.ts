import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-gits-side-menu-header',
  imports: [],
  templateUrl: './gits-side-menu-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GitsSideMenuHeaderComponent {
  
  envs = environment;

}

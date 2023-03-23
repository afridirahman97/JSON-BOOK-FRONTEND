import { Component } from '@angular/core';
//importing font awesome
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JSON-BOOK'; 
  faCoffee = faCoffee;
  showHeader = true;

}

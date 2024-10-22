import { Component } from '@angular/core';

@Component({
  selector: 'app-root', /* 3. This tag is used within index.html*/
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'PIZARRA';
}

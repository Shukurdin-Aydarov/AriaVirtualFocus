import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AriaVirtualFocus';

  onFocus(message: string, event: Event) {
    //alert(message);
    //event.preventDefault();
    console.log(message);
    const paragraph = document.createElement('p');
    paragraph.innerHTML = message;
    document.body.appendChild(paragraph);
  }
}

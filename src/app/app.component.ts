import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'shopping-list';
  loadedFeature = 'recipe';

  onNavigate(feature: string): void {
    console.log(feature);
    this.loadedFeature = feature;
  }
}

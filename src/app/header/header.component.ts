import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  collapsed: boolean = false;
  @Output() featureSelected = new EventEmitter<string>();
  selected: string = 'recipe';

  onSelect(feature: string): void {
    this.featureSelected.emit(feature);
    this.selected = feature;
  }
}

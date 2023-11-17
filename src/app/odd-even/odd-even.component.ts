import { Component } from '@angular/core';

@Component({
  selector: 'app-odd-even',
  templateUrl: './odd-even.component.html',
  styleUrls: ['./odd-even.component.scss'],
})
export class OddEvenComponent {
  onlyOdd: boolean = false;
  oddNumbers: number[] = [1, 3, 5];
  evenNumbers: number[] = [2, 4];
  value: number = 10;
}

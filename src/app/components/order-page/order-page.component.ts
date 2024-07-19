import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {

  _selectedColor : number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  get selectedColor() {
    return this._selectedColor;
  }

  set selectedColor(val : number) {
    this._selectedColor = val;
  }
}

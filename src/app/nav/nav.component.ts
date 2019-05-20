import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  displayOn: boolean = false;

  constructor() {
  }


  ngOnInit() {

  }

  firstClick() {
    this.displayOn = true;
  }

  closeMenu() {
    this.displayOn = false;
  }

}

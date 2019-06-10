import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-my-proff',
  templateUrl: './my-proff.component.html',
  styleUrls: ['./my-proff.component.css']
})
export class MyProffComponent implements OnInit {

  displayOn: boolean;

  constructor() {
  }

  ngOnInit() {
    this.displayOn = false;
  }

  openUpdate() {
    this.displayOn = true;
  }

  closeUpdate() {
    this.displayOn = false;
  }
}

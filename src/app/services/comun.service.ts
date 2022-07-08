import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComunService {

  public showContext: boolean = false;
  public contextmenux = '0px';
	public contextmenuy = '0px';

  constructor() { }

  onMouseEnterContext(ev: MouseEvent, elements: number, position = { 'left': 10, 'top': 10 }, offsetX = 155, offsetY = 20) {
		if (typeof ev.preventDefault === "function") {
			ev.preventDefault();
		}
		this.showContext = true;
		let x = 0;
		let y = 0;
		let boxHeigth = (elements * offsetY) + 16;
		if (ev.clientY < (window.innerHeight - (boxHeigth))) {
			y = ev.clientY;
		} else {
			y = window.innerHeight - (boxHeigth)
		}
		if (ev.clientX < (window.innerWidth - offsetX)) {
			x = ev.clientX;
		} else {
			x = window.innerWidth - offsetX
		}

		this.contextmenuy = (y + position.top) + 'px';
		this.contextmenux = (x + position.left) + 'px';

		//this.validateContextPosition((x + position.left), (y + position.top));
	}

  hidemenu() {
		this.showContext = false;
		this.contextmenux = '0px';
		this.contextmenuy = '0px';
	}
}

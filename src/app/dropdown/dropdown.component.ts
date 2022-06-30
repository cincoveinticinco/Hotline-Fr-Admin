import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-dropdown',
	templateUrl: './dropdown.component.html',
	styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

	@Input() toCreate: boolean | undefined;

	showOptions: boolean = false;
	filteredList: any = [];
	inputValue: string | undefined;




	constructor() { }

	ngOnInit(): void {
	}

}

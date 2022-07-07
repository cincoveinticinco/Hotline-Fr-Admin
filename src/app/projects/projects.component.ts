import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

	displayedColumns = ['production_company', 'project', 'abbreviation', 'season', 'center', 'location', 'alias', 'assign', 'open_inc', 'closed_inc', 'pk'];
	dataSource: any = [];
	searchProperties: string[] = ['production_company','p_name', 'p_abbreviation', 'center_name', 'location_name', 'alias'];
	filteredDataSource: any[] = [];
	reason = '';
	statuses: any[] = [];
	loading: boolean = true;
	projects: any[] = [];
	itemact: any;
	centers: any[] = [];
	filters: any = {
		centers: null,
		searchText: ''
	};
	view: string = 'home';

	constructor(private _aS: AdminService) {
	}

	update() {
		this.view = 'home';
		this.loadData();
	}

	ngOnInit(): void {
		this.loadData();
	}

	filter() {
		this.filteredDataSource = JSON.parse(JSON.stringify(this.dataSource));

		if (this.filters.centers) {
			this.filteredDataSource = this._aS.filterElementsInListSplited(this.filteredDataSource, "center_id", this.filters.centers, "id");
		}
		if (this.filters.searchText) {
			this.filteredDataSource = this._aS.searchByMultipleValuesExtended(this.filteredDataSource, this.searchProperties, this.filters.searchText)
		}
	}

	loadData() {
		this.loading = true;
		this._aS.getListProjects().subscribe(
			(data: any) => {
				console.log(data);
				this.dataSource = data.projects ? data.projects : [];
				this.dataSource.map((rpt: any) => rpt.assigns?.map((assign: any) => assign.value_initials = `${assign.first_name[0]}${assign.last_name[0]}`));
				this.centers = data.centers && data.centers.length ? data.centers : [];
				this.filter();
				this.loading = false;
			}
		)
	}

	showDetails(element: any) {
		this.itemact = element;
		this.view = 'edit-project';
	}

	changeView(newView: string) {
		this.view = newView;
	}
}






import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AdminService } from '../services/admin.service';
import { ComunService } from '../services/comun.service';
import { LoginService } from '../services/login.service';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

	displayedColumns = ['production_company', 'project', 'abbreviation', 'season', 'center', 'location', 'alias', 'assign', 'open_inc', 'closed_inc', 'edit'];
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
	selectedAssign: any = null;
  moreAssign: any[] = [];
	limitAsssign: number = 5;
	selectedProject: any = null;
	public service_url: string = environment.apiUrl;
	token: string = '';
	openMenu: boolean = false;

	constructor(
		private _aS: AdminService,
		public _cS: ComunService,
		private _lS: LoginService
	) {}

	update() {
		this.view = 'home';
		this.loadData();
	}

	ngOnInit(): void {
		this.token = this._lS.getToken() || '';
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
				this.dataSource = data.projects ? data.projects : [];
				this.dataSource.map((project: any)=> {
          let assigns: any[] = [];
          if(project.users_detail) {
            const users = project.users_detail.split(';');
            users.map((user: any) => assigns.push({initials: user.split(',')[0], email: user.split(',')[1]}));
          }
          project.assigns = assigns;
        })
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

	selectAssign(ev: MouseEvent, newAssing?: any) {
    this.selectedAssign = newAssing;
    this._cS.onMouseEnterContext(ev, 1);
  }

  selectMoreAssign(ev: MouseEvent, newAssings: any[]) {
    this.moreAssign = newAssings;
    this._cS.onMouseEnterContext(ev, 1);
  }

  deselectAssing() {
    this.selectedAssign = null;
    this.moreAssign = [];
    this._cS.hidemenu();
  }

	confirmDeleteProject(porject: any) {
		this.selectedProject = porject;
		this.view = 'confirm-delete-project';
	}

	cancelDelete() {
    this.view = 'home';
    this.selectedProject = null;
  }

	deleteProject() {
    this.view = 'home';
    this.loading = true;
		this._aS.deleteProject(this.selectedProject.id).subscribe({
			next: () => {
				this.loadData();
				this.selectedProject = null;
			},
			error: () => {
				this.selectedProject = null;
				this.loading = false;
			}
		});
  }

	closeRowsMenu() {
		this.openMenu = false;
    this._cS.hidemenu();
  }

  openRowsMenu(ev: MouseEvent, project: any) {
		this.openMenu = true;
		this.selectedProject = project;
    this._cS.onMouseEnterContext(ev, 1);
  }
}






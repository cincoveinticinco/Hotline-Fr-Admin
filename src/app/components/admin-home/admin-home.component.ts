import { AdminService } from 'src/app/services/admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { ComunService } from 'src/app/services/comun.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})

export class AdminHomeComponent implements OnInit {

  @ViewChild('sidenav') sidenav!: MatSidenav;

  displayedColumns = ['number_report','status', 'incidentType', 'date', 'project', 'incident', 'assign', 'comments'];
  searchProperties: string[] = ['r_reference','r_status_txt', 'Incident_type', 'p_name', 'incident_description'];
  dataSource: any[] = [];
  filteredDataSource: any[] = [];
  statuses: any[] = [];
  types: any[] = [];
  centers: any[] = [];
  projects: any[] = [];
  loading: boolean = true;
  filters: any;
  selectedReport: any = null;
  reportDetail: any = null;
  view: string = 'home';
  user: any = null;
  activeFilters: boolean = false;
  selectedAssign: any = null;
  moreAssign: any[] = [];
  limitAsssign: number = 5;

  constructor(
    public _aS: AdminService,
    private route: ActivatedRoute,
    public _cS: ComunService
  ) {};

  ngOnInit(): void {
    this.initFilters();
    this.getUser();
    this.loadData();
  }

  initFilters() {
    this.filters = {
      status: [],
      types: [],
      centers: [],
      project: [],
      searchText: ''
    };
  }

  ngAfterViewInit() {
    this.route.params.subscribe(
      (data: any) => {
        if(data.id) this.showDetails({id: data.id})
			}
		);
  }
  getUser() {
    this._aS.getUser().subscribe(
      (data: any) => {
        if(data.user) this.user = data.user;
      }
    )
  }

  loadData(){
    this.loading = true;
    this._aS.getListReports().subscribe(
      (data: any) => {
        this.dataSource = data.reports ? data.reports : [];
        this.dataSource.map(report=> {
          let assigns: any[] = [];
          if(report.users_assigned) {
            const users = report.users_assigned.split(';');
            users.map((user: any) => assigns.push({initials: user.split(',')[0], email: user.split(',')[1]}));
          }
          report.assigns = assigns;
        })
        this.statuses = data.report_statuses && data.report_statuses.length ? data.report_statuses : [];
        this.types = data.incident_types && data.incident_types.length ? data.incident_types : [];
        this.centers = data.centers && data.centers.length ? data.centers : [];
        this.projects = data.projects && data.projects.length ? data.projects : [];
        this.filter();
        this.loading = false;
      }
    )
  }

  update() {
    this.view = 'home';
    this.sidenav.close();
    this.loadData();
  }

  showDetails(report: any = null) {
    this.view = 'add-comment';
    this.sidenav.open();
    if(report) this.selectedReport = report;
    this._aS.getReportDetail(this.selectedReport.id).subscribe(
      (data: any) => {
        this.reportDetail = data;
      }
    )
    if(!report) this.loadData();
  }

  close() {
    this.view = 'home';
    this.sidenav.close();
    this.reportDetail = null;
  }

  filter() {
    this.filteredDataSource = JSON.parse(JSON.stringify(this.dataSource));
    this.activeFilters = false;
    if(this.filters.status.length && this.filters.status[0] != undefined) {
      this.filteredDataSource = this._aS.filterElementsInListSplited(this.filteredDataSource, "r_status_id", this.filters.status, "id");
      this.activeFilters = true;
    }
    if(this.filters.types.length && this.filters.types[0] != undefined) {
      this.filteredDataSource = this._aS.filterElementsInListSplited(this.filteredDataSource, "incident_type_id", this.filters.types, "id");
      this.activeFilters = true;
    }
    if(this.filters.centers.length && this.filters.centers[0] != undefined) {
      this.filteredDataSource = this._aS.filterElementsInListSplited(this.filteredDataSource, "center_id", this.filters.centers, "id");
      this.activeFilters = true;
    }
    if(this.filters.project.length && this.filters.project[0] != undefined) {
      this.filteredDataSource = this._aS.filterElementsInListSplited(this.filteredDataSource, "project_id", this.filters.project, "id");
      this.activeFilters = true;
    }
    if(this.filters.searchText) {
      this.filteredDataSource = this._aS.searchByMultipleValuesExtended(this.filteredDataSource, this.searchProperties, this.filters.searchText);
      this.activeFilters = true;
    }
  }

  dropFilters() {
    this.initFilters();
    this.filter();
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
}

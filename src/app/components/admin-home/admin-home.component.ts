import { AdminService } from 'src/app/services/admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})

export class AdminHomeComponent implements OnInit {

  @ViewChild('sidenav') sidenav!: MatSidenav;

  displayedColumns = ['status', 'incidentType', 'date', 'project', 'incident', 'assign', 'comments', 'id'];
  searchProperties: string[] = ['r_status_txt', 'Incident_type', 'p_name', 'incident_description'];
  dataSource: any[] = [];
  filteredDataSource: any[] = [];
  reason = '';
  statuses: any[] = [];
  types: any[] = [];
  centers: any[] = [];
  projects: any[] = [];
  loading: boolean = true;
  filters: any = {
    status: null,
    types: null,
    centers: null,
    project: null,
    searchText: ''
  };
  selectedRerport: any = null;
  reportDetail: any = null;
  isOpenSidenav: boolean = false;

  constructor(
    public _aS: AdminService,
    private route: ActivatedRoute
  ) {};

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit() {
    this.route.params.subscribe(
      (data: any) => {
        if(data.id) this.showDetails({id: data.id})
			}
		);
  }

  loadData(){
    this.loading = true;
    this._aS.getListReports().subscribe(
      (data: any) => {
        this.dataSource = data.reports ? data.reports : [];
        this.dataSource.map((rpt: any) => rpt.assigns?.map((assign: any) => assign.value_initials = `${assign.first_name[0]}${assign.last_name[0]}`));
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
    this.isOpenSidenav = false;
    this.sidenav.close();
    this.loadData();
  }

  showDetails(report: any = this.selectedRerport) {
    this.isOpenSidenav = true;
    this.sidenav.open();
    this.selectedRerport = report;
    this._aS.getReportDetail(this.selectedRerport.id).subscribe(
      (data: any) => {
        this.reportDetail = data;
      }
    )
  }

  close() {
    this.isOpenSidenav = false;
    this.sidenav.close();
    this.reportDetail = null;
  }

  saveReply(id: number, isClose: boolean) {
    this.loading = true;
    let params = {
      reportId: id,
      replyTxt: null,
      toClose: isClose,
    }
    this._aS.createReply(params).subscribe(
      (data: any) => {
        this.loadData();
        this.loading = false;
      }
    )
  }

  filter() {
    this.filteredDataSource = JSON.parse(JSON.stringify(this.dataSource));
    if(this.filters.status) {
      this.filteredDataSource = this._aS.filterElementsInListSplited(this.filteredDataSource, "r_status_id", this.filters.status, "id");
    }
    if(this.filters.types) {
      this.filteredDataSource = this._aS.filterElementsInListSplited(this.filteredDataSource, "incident_type_id", this.filters.types, "id");
    }
    if(this.filters.centers) {
      this.filteredDataSource = this._aS.filterElementsInListSplited(this.filteredDataSource, "center_id", this.filters.centers, "id");
    }
    if(this.filters.project) {
      this.filteredDataSource = this._aS.filterElementsInListSplited(this.filteredDataSource, "project_id", this.filters.project, "id");
    }
    if(this.filters.searchText) {
      this.filteredDataSource = this._aS.searchByMultipleValuesExtended(this.filteredDataSource, this.searchProperties, this.filters.searchText)
    }
  }
}

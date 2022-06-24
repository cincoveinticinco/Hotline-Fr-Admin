import { AdminService } from 'src/app/services/admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})

export class AdminHomeComponent implements OnInit {

  @ViewChild('sidenav') sidenav!: MatSidenav;

  displayedColumns = ['status', 'incidentType', 'date', 'project', 'incident', 'assign', 'comments', 'id'];
  dataSource:any = [];
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
    project: null
  }

  constructor(private _aS: AdminService) {
  };

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.loading = true;
    this._aS.getListReports().subscribe(
      (data: any) => {
        console.log(data);
        //this.dataSource = data.reports ? data.reports : [];
        this.statuses = data.report_statuses && data.report_statuses.length ? data.report_statuses : [];
        this.types = data.incident_types && data.incident_types.length ? data.incident_types : [];
        this.centers = data.centers && data.centers.length ? data.centers : [];
        this.projects = data.projects && data.projects.length ? data.projects : [];
        this.dataSource.map((rpt: any) => rpt.assigns?.map((assign: any) => assign.value_initials = `${assign.first_name[0]}${assign.last_name[0]}`));
        this.loading = false;
      }
    )
  }

  showDetails(id: number) {
    console.log(id);
  }

  close() {
    this.sidenav.close();
  }

  replyIncident(id: number) {
    console.log(id);
  }

  closeIncident(id: number) {
    console.log(id);
  }
}
export interface DataElement {
  id: number;
  status: string;
  incidentType: string;
  date: Date;
  project: string;
  incident: string;
  assigns?: any[];
  comments?: any[];
  center: Date;

}

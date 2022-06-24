import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  @ViewChild('sidenav') sidenav!: MatSidenav;
 
  displayedColumns = ['project', 'season', 'location', 'status', 'alias', 'assign', 'open_inc', 'closed_inc', 'pk'];
  dataSource:any = [];
  
  reason = '';
  statuses: any[] = [];
  loading: boolean = true;
  projects: any[] = [];
  itemact: any;
  centers: any[] = [];
  filters: any = {
    centers: null,
  }
  

  constructor(private _aS: AdminService) {
    
  }

  ngOnInit(): void {
    this.loadData()

  }

  loadData(){
    
    this.loading = true;
    this._aS.getListProjects().subscribe(
      (data: any) => {  
        console.log(data);
        this.dataSource = data.projects ? data.projects : [];
        this.dataSource.map((rpt: any) => rpt.assigns?.map((assign: any) => assign.value_initials = `${assign.first_name[0]}${assign.last_name[0]}`));
        this.centers = data.centers && data.centers.length ? data.centers : [];
        this.loading = false;
      }
    )
  }

  showDetails(element: any) {
    this.itemact = element
    console.log(this.itemact);
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
  pk: number;
  project: string;
  season: string;
  center: Date;
  location: string;
  status: string;
  alias: string;
  open_inc: string;
  closed_inc: string
  assigns?: any[];
}




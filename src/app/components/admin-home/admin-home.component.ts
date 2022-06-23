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
  dataSource:any = ELEMENT_DATA;
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
}
const ELEMENT_DATA: DataElement[] = [
  {id: 1, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM',
  assigns: [
    {id: 1, first_name: 'Diego', last_name: 'Sarmiento'},
    {id: 1, first_name: 'Ana', last_name: 'Martinez'},
    {id: 1, first_name: 'Ana', last_name: 'Martinez'},
    {id: 1, first_name: 'Ana', last_name: 'Martinez'},
    {id: 1, first_name: 'Ana', last_name: 'Martinez'},
  ],
  comments: [
    {id: 1, comment: 'comentario de prueba'},
    {id: 1, comment: 'comentario de prueba'}
  ]},
  {id: 2, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
  {id: 3, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
  {id: 4, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
  {id: 5, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
  {id: 6, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
  {id: 7, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
  {id: 8, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
  {id: 9, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
  {id: 10, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
  {id: 11, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
  {id: 12, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
  {id: 13, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
  {id: 14, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
  {id: 15, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
  {id: 16, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
  {id: 17, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
  {id: 18, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
];


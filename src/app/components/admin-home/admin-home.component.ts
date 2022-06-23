import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})

export class AdminHomeComponent implements OnInit {

  displayedColumns = ['status', 'incidentType', 'date', 'project', 'incident', 'assign', 'comments', 'pk'];
  dataSource:any = ELEMENT_DATA;
  statuses: any[] = [];
  loading: boolean = true;

  constructor(private _aS: AdminService) {
    this.statuses = [
      { 'pk': 1, 'name': 'Started' },
      { 'pk': 2, 'name': 'New' },
      { 'pk': 3, 'name': 'Respond to Reporter' },
      { 'pk': 4, 'name': 'To Review' },
      { 'pk': 5, 'name': 'Closed' },
    ];
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.loading = true;
    this._aS.getListReports().subscribe(
      (data: any) => {
        console.log(data);
        //this.dataSource = data.reports ? data.reports : [];
        this.dataSource.map((rpt: any) => rpt.assigns?.map((assign: any) => assign.value_initials = `${assign.first_name[0]}${assign.last_name[0]}`));
        this.loading = false;
      }
    )
  }

  reply(id: number) {
    console.log(id);
  }

  close(id: number) {
    console.log(id);
  }
}
export interface DataElement {
  pk: number;
  status: string;
  incidentType: string;
  date: Date;
  project: string;
  incident: string;
  assigns?: any[];
  comments?: any[];
}
const ELEMENT_DATA: DataElement[] = [
  {pk: 1, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM',
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
  {pk: 2, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
  {pk: 3, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
  {pk: 4, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
  {pk: 5, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
  {pk: 6, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
  {pk: 7, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
  {pk: 8, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
  {pk: 9, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
  {pk: 10, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
  {pk: 11, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
  {pk: 12, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
  {pk: 13, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
  {pk: 14, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
  {pk: 15, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
  {pk: 16, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
  {pk: 17, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
  {pk: 18, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
];


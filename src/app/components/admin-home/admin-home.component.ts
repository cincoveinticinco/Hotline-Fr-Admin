import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})

export class AdminHomeComponent implements OnInit {

  @ViewChild('sidenav') sidenav!: MatSidenav;

  displayedColumns = ['status', 'incidentType', 'date', 'project', 'incident', 'assign', 'comments', 'pk'];
  dataSource:any = ELEMENT_DATA;
  
  reason = '';
  statuses: any[] = [];

  constructor() {
    this.statuses = [
      { 'pk': 1, 'name': 'Started' },
      { 'pk': 2, 'name': 'New' },
      { 'pk': 3, 'name': 'Respond to Reporter' },
      { 'pk': 4, 'name': 'To Review' },
      { 'pk': 5, 'name': 'Closed' },
    ];
  }

  ngOnInit(): void {
  }

  showDetails(pk: number) {
    console.log(pk);
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
  status: string;
  incidentType: string;
  date: Date;
  project: string;
  incident: string;
}
const ELEMENT_DATA: DataElement[] = [
  {pk: 1, status: 'NEW WEB', incidentType: 'DISCRIMINATION', date: new Date(), project: 'AMAZONIA S1 BRASIL', incident: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM'},
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


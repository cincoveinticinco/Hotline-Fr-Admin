import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  @ViewChild('sidenav') sidenav!: MatSidenav;
 
  displayedColumns = ['project', 'season', 'center', 'location', 'status', 'alias', 'assign', 'open_inc', 'closed_inc', 'pk'];
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
  project: string;
  season: string;
  center: Date;
  location: string;
  status: string;
  alias: string;
  open_inc: string;
  closed_inc: string
}
const ELEMENT_DATA: DataElement[] = [
  {pk: 1, project: 'AMAZONIA S1 BRASIL', season: '2', center: new Date(), location: 'MEXICO', status: 'OPEN', alias: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM', open_inc: '20', closed_inc: '10'},
  {pk: 2, project: 'AMAZONIA S1 BRASIL', season: '2', center: new Date(), location: 'MEXICO', status: 'OPEN', alias: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM', open_inc: '20', closed_inc: '10'},
  {pk: 3, project: 'AMAZONIA S1 BRASIL', season: '2', center: new Date(), location: 'MEXICO', status: 'OPEN', alias: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM', open_inc: '20', closed_inc: '10'},
  {pk: 4, project: 'AMAZONIA S1 BRASIL', season: '2', center: new Date(), location: 'MEXICO', status: 'OPEN', alias: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM', open_inc: '20', closed_inc: '10'},
  {pk: 5, project: 'AMAZONIA S1 BRASIL', season: '2', center: new Date(), location: 'MEXICO', status: 'OPEN', alias: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM', open_inc: '20', closed_inc: '10'},
  {pk: 6, project: 'AMAZONIA S1 BRASIL', season: '2', center: new Date(), location: 'MEXICO', status: 'OPEN', alias: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM', open_inc: '20', closed_inc: '10'},
  {pk: 7, project: 'AMAZONIA S1 BRASIL', season: '2', center: new Date(), location: 'MEXICO', status: 'OPEN', alias: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM', open_inc: '20', closed_inc: '10'},
  {pk: 8, project: 'AMAZONIA S1 BRASIL', season: '2', center: new Date(), location: 'MEXICO', status: 'OPEN', alias: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM', open_inc: '20', closed_inc: '10'},
  {pk: 9, project: 'AMAZONIA S1 BRASIL', season: '2', center: new Date(), location: 'MEXICO', status: 'OPEN', alias: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM', open_inc: '20', closed_inc: '10'},
  {pk: 10, project: 'AMAZONIA S1 BRASIL', season: '2', center: new Date(), location: 'MEXICO', status: 'OPEN', alias: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM', open_inc: '20', closed_inc: '10'},
  {pk: 11, project: 'AMAZONIA S1 BRASIL', season: '2', center: new Date(), location: 'MEXICO', status: 'OPEN', alias: 'LOREM IPSUN DOLOR SIT AMENT, CONSECTUR ADIPISING ELIT. PHASELLUS ALIQUET FELIS UT FRIGALLANGA IACULIUS. VIVAMOS CURSUS ELIT ET DIAM INTERDUM', open_inc: '20', closed_inc: '10'},

];



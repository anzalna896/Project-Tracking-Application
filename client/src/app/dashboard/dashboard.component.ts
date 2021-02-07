import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
export interface PeriodicElement {
  task: string;
  position: number;
  enddate: string;
  status: string;
  progress: string;
  assigness: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, task: 'Website(React)', enddate:'30/06/2020', status: 'Completed', progress: '100', assigness:'../../../assets/images/anzalna.PNG',},
  {position: 2, task: 'Trivago app(React)', enddate:'05/09/2020', status: 'On going', progress: '50', assigness:'../../../assets/images/amal.jpeg',},
  {position: 3, task: 'Early Bird attendence tracker(React)', enddate: '10/01/2021', status: 'Cancelled', progress: '40', assigness:'../../../assets/images/rukzana.PNG',},
  {position: 4, task: 'Bigbasket Clone(Angular)', enddate:'07/01/2021', status: 'Completed', progress: '50', assigness:'../../../assets/images/amal.jpeg',},
  {position: 6, task: 'Project Tracking(Angular)', enddate:'07/02/2021', status: 'Completed', progress: '90', assigness:'../../../assets/images/anzalna.PNG',},
  {position: 6, task: 'OLX', enddate:'00/00/0000', status: 'Not Started', progress: '50', assigness:'../../../assets/images/rukzana.PNG',},
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
displayedColumns: string[] = ['position', 'task', 'enddate', 'status', 'progress', 'assigness'];
  dataSource = ELEMENT_DATA;
  raseel:string ="assets/images/raseel.jpeg";
  anzalna:string="assets/images/anzalna.png";
  constructor() { }

  ngOnInit(): void {
  }

}

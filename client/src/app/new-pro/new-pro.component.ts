import { Component, OnInit } from '@angular/core';
import { TaskserviceService } from "src/app/taskservice.service";

@Component({
  selector: 'app-new-pro',
  templateUrl: './new-pro.component.html',
  styleUrls: ['./new-pro.component.css']
})
export class NewProComponent implements OnInit {

  constructor(private taskService:TaskserviceService) { }

  ngOnInit(): void {
  }
  createPro(title:string,lang:string,pro:number){
    this.taskService.createList(title,lang,pro).subscribe((response:any)=>{
      alert("NEW LIST ADDED")
      console.log(response);
    });
  }
}

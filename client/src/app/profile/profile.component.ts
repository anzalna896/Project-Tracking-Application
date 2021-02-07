import { Component, OnInit,ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { TaskserviceService } from "src/app/taskservice.service";
import { AuthenticationService, UserDetails } from "../authentication.service";
import { List } from 'src/app/models/list.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  @ViewChild('ipt', { static: true }) input: ElementRef;
  ngAfterViewInit() {
 console.log(this.input.nativeElement.value);
  }
  details: UserDetails;
lists:List[];
s:number;
id:string[];
m:string;
i:number;

  constructor(private auth: AuthenticationService,private taskService:TaskserviceService,private route:ActivatedRoute) {
    this.id = [
     "option1",
     "option2",
     "option3",
     "option4",
     "option5",
     "option6"
   ];
  }

  ngOnInit() {
    this.taskService.getList().subscribe((lists: List[]) => {
   this.lists = lists;
 })
    this.auth.profile().subscribe(
      user => {
        this.details = user;
      },
      err => {
        console.error(err);
      }
    );

  }

  sf(){

  }

}

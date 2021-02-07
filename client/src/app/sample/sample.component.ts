import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/models/list.model';
import { HttpClient, HttpEventType } from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import {FormControl} from "@angular/forms";

import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskserviceService } from "src/app/taskservice.service";
import { AuthenticationService, UserDetails } from "../authentication.service";
@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {
lists:List[];
details: UserDetails;
fileData: any = null;
previewUrl:any = null;
fileUploadProgress: any = null;
uploadedFilePath: any = null;
listId: string;
  constructor(private auth: AuthenticationService,private route:ActivatedRoute,private taskService:TaskserviceService,private http: HttpClient,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,private router: Router) {
    iconRegistry.addSvgIcon('facebook',sanitizer.bypassSecurityTrustResourceUrl('assets/images/facebook.svg'));
    iconRegistry.addSvgIcon('instagram',sanitizer.bypassSecurityTrustResourceUrl('assets/images/instagram.svg'));
    iconRegistry.addSvgIcon('linkedin',sanitizer.bypassSecurityTrustResourceUrl('assets/images/linkedin.svg'));
    iconRegistry.addSvgIcon('twitter',sanitizer.bypassSecurityTrustResourceUrl('assets/images/twitter.svg')); }

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




  updateList(id:string,pro: string) {
this.taskService.updateList(id, pro).subscribe(() => {
console.log("Succesful")
})
}

    fileProgress(fileInput: any) {
        this.fileData = <File>fileInput.target.files[0];
        this.preview();
  }

  preview() {
      // Show preview
      var mimeType = this.fileData.type;
      if (mimeType.match(/image\/*/) == null) {
        return;
      }

      var reader = new FileReader();
      reader.readAsDataURL(this.fileData);
      reader.onload = (_event) => {
        this.previewUrl = reader.result;
      }
  }

  onSubmit() {
     const formData = new FormData();
      formData.append('files', this.fileData);

      this.fileUploadProgress = '0%';

      this.http.post('https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload', formData, {
        reportProgress: true,
        observe: 'events'
      })

        }

}

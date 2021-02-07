import { Component, OnInit,OnDestroy  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl } from "@angular/forms";

import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { Subscription } from "rxjs";

import { ProfileService } from "src/app/services/profile.service";
import { Profile } from "src/app/models/images";

declare var M: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {
  test:Boolean=false;
  profiles: Profile[] = [];
  private profileSubscription: Subscription;
  form: FormGroup;
profile: Profile;
imageData: string;


  constructor(public employeeService: EmployeeService,private profileService: ProfileService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshEmployeeList();
    this.test=true;


    this.profileService.getProfiles();
        this.profileSubscription = this.profileService
          .getProfilesStream()
          .subscribe((profiles: Profile[]) => {
            this.profiles = profiles;
          });


          this.form = new FormGroup({
  name: new FormControl(null),
  image: new FormControl(null),
});
  }
  ngOnDestroy() {
  this.profileSubscription.unsubscribe();
}

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.employeeService.selectedEmployee = {
      _id: "",
      name: "",
      position: "",
      office: "",
      salary: null,
      designation:"",
      team:"",
      phone:null,
      email:"",
      cid:"",
      location:""
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.employeeService.postEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.employeeService.putEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
    this.test=true;
  }

  refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.employees = res as Employee[];
    });
  }

  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = emp;
    this.test=false;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }
  f(){
  this.test=false;
}
onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }


  onSubmitNN() {
    this.profileService.addProfile(this.form.value.name, this.form.value.image);
    this.form.reset();
    this.imageData = null;
  }

}

import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Key } from 'protractor';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm:FormGroup;
  fullNameLength = 0;
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    // this.employeeForm = new FormGroup({
    //   fullName :new FormControl(),
    //   email: new FormControl(),
    //   skills : new FormGroup({
    //     skillName: new FormControl(),
    //     experienceInYears: new FormControl(),
    //     proficiency: new FormControl()
    //   })
    // });

    this.employeeForm=this.fb.group({
      fullName : ['',[Validators.required,Validators.minLength(2),Validators.maxLength(10)]],
      email : [''],
      skills : this.fb.group({
        skillName : [''],
        experienceInYears : [''],
        proficiency : ['']
      })
    });

    // this.employeeForm.get('skills').valueChanges.subscribe((value) => {
    //   console.log(JSON.stringify(value));
    // });
  }

  logKeyValuePair(group:FormGroup) : void {
    Object.keys(group.controls).forEach((key:string) => {
      const abstractControl = group.get(key);
      if(abstractControl instanceof FormGroup){
        this.logKeyValuePair(abstractControl);
      }
      else{
        //console.log('Key - '+key+' '+ 'Value - '+abstractControl.value)
        abstractControl.disable();
      }
    });
  }
  onLoadDataClick():void{
    // this.employeeForm.setValue({
    //   fullName:'Dheeraj Kumar Sharma',
    //   email:'dheerajarmy@gmail.com',
    //   skills:{
    //     skillName:'C#',
    //     experienceInYears:5,
    //     proficiency:'beginner'
    //   }
    // });
    this.logKeyValuePair(this.employeeForm);
  }

  onSubmit() : void{
    console.log(this.employeeForm.value);
  }

}

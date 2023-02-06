import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-project-form',
  templateUrl: './create-project-form.component.html',
  styles: [
  ]
})

export class CreateProjectFormComponent implements OnInit {

  createProjectForm!: FormGroup;
  submitted : boolean = false;
  principalclientlength : number = 0;
  imageName = "";
  currencyType = "";
  currency:number = 0;


  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createProjectForm = this.formBuilder.group({
      'image' : ['',Validators.required],
      'principal-client': this.formBuilder.array([this.addPrincipalClientGroup()]),
      'description' : ['',Validators.required],
      'projectlocation' : ['',Validators.required],
      'fromdate' : ['',Validators.required],
      'todate' : ['',Validators.required],
      'budget' : ['',Validators.required],
      'servicetype' : ['',Validators.required],
      'industry' : ['',Validators.required],
      'sectorwork' : ['',Validators.required]
    });
  }

  //Append Fields Set
  private addPrincipalClientGroup(): FormGroup {
    return this.formBuilder.group({
      'organization': ['',Validators.required],
      'contact': ['',Validators.required],
      'designation': ['',Validators.required],
      'email':['',Validators.required],
      'mobileno':['',Validators.required]
    });
  }

  showpcform():void{
    this.principalclientlength = this.principalclientArray.length;
    if(this.principalclientlength == 0){
      this.addPrincipalClient();
    }
  }

  //Add Fields
  addPrincipalClient(): void {
    this.principalclientArray.push(this.addPrincipalClientGroup());
    this.principalclientlength = this.principalclientArray.length;
  }

  //Remove Fields
  removePrincipalClient(index: number): void {
    this.principalclientArray.removeAt(index);
    this.principalclientlength = this.principalclientArray.length;
  }

  //Fields Array
  get principalclientArray(): FormArray {
    return <FormArray>this.createProjectForm.get('principal-client');
  }

  //Upload Image
  uploadImage(event:any){
    const img = event.target.files[0].name;
    // this.imgUrl = event.target.result;
    this.imageName = img;
    this.createProjectForm.patchValue({
      image : img
    })
  }

  //Budget currencyType
  selectCurrency(e:any){
    // console.log(e.target.value);
    this.currencyType = e.target.value;
    let amt = this.createProjectForm.value.budget;
    console.log(amt);
    if(this.currencyType == "USD $"){
      this.currency = amt * 70;
      console.log("INR ₹",this.currencyType);
    } else if(this.currencyType == "INR ₹") {
      this.currency = amt / 70;
      console.log("USD $",this.currencyType);
    }
  }

  HandleCurrency(e:any){
    let amt = this.createProjectForm.value.budget;
    // this.currencyType = e.target.value;
    console.log("input amt",amt);
    this.selectCurrency(e);
    console.log("this.currencyType",this.currencyType);
  }

  createProject(){
    this.submitted = true;
    if(this.createProjectForm.valid){
      console.log("Create Project Form Values >> ",this.createProjectForm.value);
    }
  }

  get f(){
    return this.createProjectForm.controls;
  }

}

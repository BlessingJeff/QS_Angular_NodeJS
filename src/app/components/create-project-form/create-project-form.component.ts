import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  // imageName = "";
  currencyType = "";
  currency:number = 0;
  duration:number = 0;
  startDate:any;
  endDate:any;
  industryList:any = [];
  sectorWork:any = [];
  selectedindustryItems:any = [];
  dropdownSettings:IDropdownSettings = {};
  selectedIndustry:any = [];
  selectedSectorWork:any = [];
  principalclientorganization:any = [];
  selectedSectorWorkItems:any = [];
  usd:number = 82.73;
  principalclientbuttons:boolean = false;
  imgurl:any;
  // defaultImage: "assets/images/add.png" = "assets/images/add.png";
  defaultImage = 'assets/images/add.png';
  sessionData:any;

  constructor(private formBuilder:FormBuilder, private router:Router, private cd:ChangeDetectorRef) {
    this.imgurl = sessionStorage.getItem('imgurl');
  }

  ngOnInit(): void {
    this.createProjectForm = this.formBuilder.group({
      'image' : ['',Validators.required],
      'principalclientform': this.formBuilder.array([this.addPrincipalClientGroup()]),
      'description' : ['',Validators.required],
      'projectlocation' : ['',Validators.required],
      'fromdate' : ['',Validators.required],
      'todate' : ['',Validators.required],
      'currency' : [''],
      'budget' : ['',Validators.required],
      'servicetype' : ['',Validators.required],
      'industry' : ['',Validators.required],
      'sectorwork' : ['',Validators.required]
    });
    if(this.currencyType == ""){
      this.currencyType = "USD $"
    } else {
      this.currencyType = this.createProjectForm.value.currency;
    }
    this.industryList = [
      { item_id: 1, item_text: 'Industry 1' },
      { item_id: 2, item_text: 'Industry 2' },
      { item_id: 3, item_text: 'Industry 3' },
      { item_id: 4, item_text: 'Industry 4' },
      { item_id: 5, item_text: 'Industry 5' }
    ];
    this.sectorWork = [
      { item_id: 1, item_text: 'sectorWork 1' },
      { item_id: 2, item_text: 'sectorWork 2' },
      { item_id: 3, item_text: 'sectorWork 3' },
      { item_id: 4, item_text: 'sectorWork 4' },
      { item_id: 5, item_text: 'sectorWork 5' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    const sessiondata = sessionStorage.getItem('CreateProject');
    if(sessiondata){
      this.sessionData = JSON.parse(sessiondata);
      this.createProjectForm.patchValue(this.sessionData);
      this.imgurl = sessionStorage.getItem('imgurl');

      this.selectedindustryItems = this.sessionData.industry;
      let industryArray = this.selectedindustryItems.map(function (el:any) {
        return el.item_text;
      });
      this.selectedIndustry = industryArray;
      this.selectedSectorWorkItems = this.sessionData.sectorwork;
      let sectorworkArray = this.selectedSectorWorkItems.map(function (el:any) {
        return el.item_text;
      });
      this.selectedSectorWork = sectorworkArray;
    }
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
    return <FormArray>this.createProjectForm.get('principalclientform');
  }

  addShowPrincipalClient(){
    this.principalclientlength = 0;
    this.principalclientbuttons = true;
    var principalclientorganizationname = this.createProjectForm.value.principalclientform.map(function (el:any) {
      return el.organization;
    });
    this.principalclientorganization = principalclientorganizationname;
  }

  //Upload Image
  uploadImage(event:any){
   const target = event.target as HTMLInputElement;
    if (!target) {
      console.error('Event target is null');
      return;
    }
    if (!target.files) {
      console.error('No files found on target');
      return;
    }

    const file = target.files[0];
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    if (!ctx) {
      console.error('Failed to get 2D rendering context for canvas');
      return;
    }

    img.src = URL.createObjectURL(file);

   img.onload = () => {
      canvas.width = 600;
      canvas.height = 600;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      this.imgurl = canvas.toDataURL();
      sessionStorage.setItem('imgurl', this.imgurl);
    };

     img.src = URL.createObjectURL(file);
    const reader = new FileReader(); // HTML5 FileReader API

    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgurl = reader.result;
        this.createProjectForm.patchValue({
          image: reader.result
        });
      }
      this.cd.markForCheck();
    }
  }

  //Budget currencyType
  selectCurrency(e:any){
    this.currencyType = e.target.value;
    let amt = this.createProjectForm.value.budget;
    if(this.currencyType == "USD $"){
      this.currency = amt / this.usd;
    } else if(this.currencyType == "INR ₹") {
      this.currency = amt * this.usd;
    }
  }

  HandleCurrency(e:any){
    let amt = e.target.value;
    this.currencyType = this.createProjectForm.value.currency;
    if(this.currencyType == "") {
      this.currencyType = "INR ₹";
      this.currency = amt * this.usd;
    } else if(this.currencyType == "USD $") {
      this.currency = amt / this.usd;
    } else if(this.currencyType == "INR ₹") {
      this.currency = amt * this.usd;
    }
  }

  createProject(){
    this.submitted = true;
    if(this.createProjectForm.valid){
      sessionStorage.setItem('CreateProject',JSON.stringify(this.createProjectForm.value));
      this.router.navigate(['/project-team']);
    }
  }

  get f(){
    return this.createProjectForm.controls;
  }

  fromDate(){
    this.startDate = this.createProjectForm.value.fromdate;
    this.monthDuration();
  }

  toDate(){
    this.endDate = this.createProjectForm.value.todate;
    this.monthDuration();
  }

  monthDuration(){
    if(this.startDate != null && this.endDate != null){
      this.dateRange(this.startDate,this.endDate);
    }
  }

  dateRange(startDate:any, endDate:any) {
    var start      = startDate.split('-');
    var end        = endDate.split('-');
    var startYear  = parseInt(start[0]);
    var endYear    = parseInt(end[0]);
    var dates      = [];
    for(var i = startYear; i <= endYear; i++) {
      var endMonth = i != endYear ? 12 : parseInt(end[1]) - 1;
      var startMon = i === startYear ? parseInt(start[1])-1 : 0;
      for(var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j+1) {
        var month = j+1;
        var displayMonth = month < 10 ? '0'+month : month;
        dates.push([i, displayMonth, '01'].join('-'));
      }
    }
    this.duration = dates.length - 1;
    return dates;
  }

  // Industry
  onItemSelect(item: any) {
    this.onSelectIndustry();
  }
  onItemDeSelect(item: any){
    this.onSelectIndustry();
  }
  onSelectIndustry(){
    var industryArray = this.selectedindustryItems.map(function (el:any) {
      return el.item_text;
    });
    this.selectedIndustry = industryArray;
  }

  // Sector of Work
  onSectorWorkSelect(item: any) {
    this.onSelectSector();
  }
  onSectorWorkDeSelect(item: any){
    this.onSelectSector();
  }
  onSelectSector(){
    var sectorworkArray = this.selectedSectorWorkItems.map(function (el:any) {
      return el.item_text;
    });
    this.selectedSectorWork = sectorworkArray;
  }

}

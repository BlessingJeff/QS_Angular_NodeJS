import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-project-team-form',
  templateUrl: './project-team-form.component.html',
  styles: [
  ]
})

export class ProjectTeamFormComponent implements OnInit {

  projectteamform! : FormGroup;
  submitted:boolean = false;
  dropdownSettings:IDropdownSettings = {};
  consultant:any = [];
  selectedConsultantItems:any = [];
  selectedConsultant:any = [];
  createprojectform:any;

  @Output() consultantEvt : EventEmitter<string> = new EventEmitter<string>();

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.projectteamform = this.formBuilder.group({
      'partners':['',Validators.required],
      'managers':['',Validators.required],
      'associates':['',Validators.required],
      'consultants':['',Validators.required],
      'subcontractors':['',Validators.required],
      'collaborators':['',Validators.required]
    });
    this.consultant = [
      { item_id: 1, item_text: 'Akash Kumar', item_value:'AU' },
      { item_id: 2, item_text: 'Bhupendra Patel', item_value:'BP' },
      { item_id: 3, item_text: 'Kiran Bhuj', item_value:'KP' },
      { item_id: 4, item_text: 'Morris Menon', item_value:'MM' },
      { item_id: 5, item_text: 'Shweta Singh', item_value:'SS' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
    const sessionData:any = sessionStorage.getItem('CreateProject');
    this.createprojectform = JSON.parse(sessionData);
  }

  get f() {
    return this.projectteamform.controls;
  }

  onConsultantsSelect(item: any){
    var ConsultantsArray = this.selectedConsultantItems.map(function (el:any) {
      return el.item_id;
    });
    let lastId:any = ConsultantsArray[ConsultantsArray.length-1];
    var consult = this.consultant.find((resp:any) => {
      return resp.item_id == lastId;
    });
    this.selectedConsultant.push(consult);
    this.consultantEvt.emit(this.selectedConsultant);
  }

  onConsultantsDeSelect(item: any){
    this.selectedConsultant = this.selectedConsultant.filter((resp:any) =>{
      return resp.item_id !== item.item_id;
    });
    this.consultantEvt.emit(this.selectedConsultant);
  }

  onSubmit(): void{
    this.submitted = true;
    if(this.projectteamform.valid){
      let projectData = Object.assign(this.createprojectform, this.projectteamform.value);
      console.log("projectData",projectData);
    }
  }
}

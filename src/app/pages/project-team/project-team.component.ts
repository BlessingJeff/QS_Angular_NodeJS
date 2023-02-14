import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-team',
  templateUrl: './project-team.component.html',
  styles: [
  ]
})
export class ProjectTeamComponent implements OnInit {


  consultants:string[] = [];
  imgurl:any;


  constructor() { }

  ngOnInit(): void {
    let sessionData:any = sessionStorage.getItem("CreateProject");
    let sessionImage = JSON.parse(sessionData);
    // this.imgurl = sessionImage.image;
    this.imgurl = sessionStorage.getItem('imgurl');
  }


  //Upload Image
  // uploadImage(event:any){
  //   const target = event.target as HTMLInputElement;
  //    if (!target) {
  //      console.error('Event target is null');
  //      return;
  //    }
  //    if (!target.files) {
  //      console.error('No files found on target');
  //      return;
  //    }

  //    const file = target.files[0];
  //    const canvas = document.createElement('canvas');
  //    const ctx = canvas.getContext('2d');
  //    const img = new Image();

  //    if (!ctx) {
  //      console.error('Failed to get 2D rendering context for canvas');
  //      return;
  //    }

  //   img.onload = () => {
  //      canvas.width = 200;
  //      canvas.height = 200;

  //      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  //      this.imgurl = canvas.toDataURL();
  //    };

  //     img.src = URL.createObjectURL(file);
  //    const reader = new FileReader(); // HTML5 FileReader API


  //  }


  afterConsultantAdd(event:any){
    const consultshortname = event.map(function(e:any){
      return e.item_value;
    })
    this.consultants = consultshortname;
  }

}

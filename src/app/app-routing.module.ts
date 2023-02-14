import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ProjectsArchivesComponent } from './pages/projects-archives/projects-archives.component';
import { ProjectcardComponent } from './components/projectcard/projectcard.component';
import { ProjectTeamComponent } from './pages/project-team/project-team.component';



const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'projects-archives',component:ProjectsArchivesComponent},
  {path:'create-project',component:CreateProjectComponent},
  {path:'projectcard',component:ProjectcardComponent},
  {path:'project-team',component:ProjectTeamComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

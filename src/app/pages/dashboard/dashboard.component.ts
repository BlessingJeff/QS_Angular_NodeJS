import { Component } from '@angular/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent {
  projects = [
    {
      id: 1322,
      name: 'Project Zen',
      description: 'Bill & Melinda Gates Foundation',
      progress: 25,
    },
    {
      id: 1322,
      name: 'Coca-Cola IPL Branding',
      description: 'Bill & Melinda Gates Foundation',
      progress: 25,
    },
    {
      id: 1322,
      name: 'Magnetic Program',
      description: 'Bill & Melinda Gates Foundation',
      progress: 25,
    },
    {
      id: 1322,
      name: 'Project Chroma',
      description: 'Bill & Melinda Gates Foundation',
      progress: 25,
    },
  ];

  searchText: string = '';
  noMatches = false;

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue
    this.noMatches = this.projects.every(
      project => !project.name.toLowerCase().includes(this.searchText)
    );
  }
  }


import { Component } from '@angular/core';
@Component({
  selector: 'app-projects-archives',
  templateUrl: './projects-archives.component.html',
  styles: [],
})
export class ProjectsArchivesComponent {
  projects = [
    {
      id: 1322,
      name: 'Aleena Chase',
      description:
        'Description here the monsoon weather has been very gloomy lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiud mone lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiud',
      client: 'Client Name 1 | Placeholder Name here | Adv...',
      cards: [
        { button: 'Behavioural Design' },
        { button: 'Branding & Marketing' },
        { button: 'Healthcare' },
        { button: 'Speculative Design' },
        { button: 'FinTech' },
        { button: 'Animation & Film' },
      ],
    },

    {
      id: 1323,
      name: 'Blair Haley',
      description:
        'Description here the monsoon weather has been very gloomy lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiud mone lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiud',
      client: 'Client Name 1 | Placeholder Name here | Adv...',
      cards: [
        { button: 'Behavioural Design' },
        { button: 'Branding & Marketing' },
        { button: 'Healthcare' },
        { button: 'Speculative Design' },
        { button: 'FinTech' },
        { button: 'Animation & Film' },
        { button: 'FinTech' },
      ],
    },

    {
      id: 1324,
      name: 'Cleo Montes',
      description:
        'Description here the monsoon weather has been very gloomy lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiud mone lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiud',
      client: 'Client Name 1 | Placeholder Name here | Adv...',
      cards: [
        { button: 'Behavioural Design' },
        { button: 'Branding & Marketing' },
        { button: 'Healthcare' },
        { button: 'Speculative Design' },
        { button: 'FinTech' },
        { button: 'Mental Health' },
        { button: 'Speculative Design' },
      ],
    },

    {
      id: 1325,
      name: 'Danna Bennett',
      description:
        'Description here the monsoon weather has been very gloomy lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiud mone lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiud',
      client: 'Client Name 1 | Placeholder Name here | Adv...',
      cards: [
        { button: 'Branding & Marketing' },
        { button: 'Speculative Design' },
      ],
    },
    {
      id: 1327,
      name: 'Calvin',
      description:
        'Description here the monsoon weather has been very gloomy lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiud mone lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiud',
      client: 'Client Name 1 | Placeholder Name here | Adv...',
      cards: [
        { button: 'Branding & Marketing' },
        { button: 'Behavioural Design' },
        { button: 'Development sector' },
        { button: 'Mental Health' },
      ],
    },
    {
      id: 1328,
      name: 'Ronald',
      description:
        'Description here the monsoon weather has been very gloomy lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiud mone lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiud',
      client: 'Client Name 1 | Placeholder Name here | Adv...',

      cards: [
        { button: 'Healthcare' },
        { button: 'Speculative Design' },
        { button: 'FinTech' },
        { button: 'Animation & Film' },
        { button: 'Animation & Film' },
        { button: 'Branding & Marketing' },
        { button: 'Behavioural Design' },
        { button: 'Development sector' },
        { button: 'Mental Health' },
      ],
    },
  ];

  buttons = [
    'Behavioural Design',
    'Branding & Marketing',
    'Healthcare',
    'Speculative Design',
    'FinTech',
    'Animation & Film',
    'Design Research',
  ];

  filterByButton(button: any) {
    this.button = { button: button };
    let tempProjects = this.projects;
    this.projects = [];
    this.projects = tempProjects;
  }

  button: any = '';
  searchText: string = '';
  noMatches = false;


  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue
    this.noMatches = this.projects.every(
      project => !project.name.toLowerCase().includes(this.searchText)
    );
  }

  hasMatchingButton(project: any) {
    return project.cards.some(
      (card: { button: any }) => card.button === this.button.button
    );
  }

  showMoreTags = false;
  expandedProjects : any[] = [];

toggleTags(project: any) {
  if (this.expandedProjects.includes(project)) {
    this.expandedProjects = this.expandedProjects.filter(p => p !== project);
  } else {
    this.expandedProjects.push(project);
  }
}
}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  projects: any[] = [];
  results: any[] = [];
  currentView: 'vote' | 'results' = 'vote';
  loaded = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log("ngOnInit appelé");
    if (this.loaded) return;
    this.loaded = true;
    this.loadProjects();
  }

  loadProjects() {
    this.http.get('/api/projects')
      .subscribe((data: any) => this.projects = data);
  }

  loadResults() {
    this.http.get('/api/results')
      .subscribe((data: any) => this.results = data);
  }

  vote(projectId: number) {
    this.http.post('/api/vote', {
      project_id: projectId
    }).subscribe(() => {
      alert('Vote enregistré avec succès !');
      // Recharger les projets si nécessaire
      this.loadProjects();
    });
  }

  switchView(view: 'vote' | 'results') {
    this.currentView = view;
    if (view === 'results') {
      this.loadResults();
    }
  }

  getTotalVotes(): number {
    return this.results.reduce((sum, r) => sum + r.votes, 0);
  }

  getPercentage(votes: number): number {
    const total = this.getTotalVotes();
    return total > 0 ? (votes / total) * 100 : 0;
  }
}
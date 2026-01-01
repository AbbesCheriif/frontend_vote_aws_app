import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [CommonModule],
  standalone: true
})
export class AppComponent implements OnInit {
  projects: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('/api/projects')
      .subscribe((data: any) => this.projects = data);
  }

  vote(projectId: number) {
    this.http.post('/api/vote', {
      project_id: projectId
    }).subscribe(() => alert('Vote enregistré'));
  }
}





// version originale (aucune modification)
// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title = 'frontend';
// }

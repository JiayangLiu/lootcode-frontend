import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {
  private url = '';

  constructor(private http: Http) { }

  getAllProblems() {
    return this.http.get(this.url);
  }
}

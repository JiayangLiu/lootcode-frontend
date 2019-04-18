import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Problem } from '../problems/problem.model';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {
  private url = 'https://my-json-server.typicode.com/JiayangLiu/lootcode-mockdb/problems';

  constructor(private http: HttpClient) { }
  problemsObservable : Observable<Problem[]>;

  getAllProblems() {
    this.problemsObservable = this.http.get<Problem[]>(this.url);
    return this.problemsObservable;
  }

  // createProblem(resource) {
  //   return this.http.post(this.url, JSON.stringify(resource))
  //     .map(response => response);
  // }

  // updateProblem(resource) {
  //   return this.http.patch(this.url + '/' + resource.id, JSON.stringify({ isRead: true }))
  //     .map(response => response);     
  // }

  // deleteProblem(id) {
  //   return this.http.delete(this.url + '/' + id)
  //     .map(response => response);
  // }
}
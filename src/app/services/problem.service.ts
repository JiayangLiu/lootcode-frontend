import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Problem } from '../problems/problem.model';
import { ProblemDetail } from '../problems/problem.detail.model';
import { HttpHeaders } from '@angular/common/http';
import { Status } from './status.model';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {
  private url = 'http://power3.cs.virginia.edu:18888/api/problems';

  private url4detailproblem = 'https://my-json-server.typicode.com/JiayangLiu/lootcode-mockdb/problem';
  constructor(private http: HttpClient) { }

  problemsObservable : Observable<Problem[]>;
  problemDetailObservable: Observable<ProblemDetail>;
  createObservable : Observable<Status>;

  getAllProblems() {
    this.problemsObservable = this.http.get<Problem[]>(this.url);
    return this.problemsObservable;
  }

  getProblemCompany(company_name) {
    this.problemsObservable = this.http.get<Problem[]>('http://power3.cs.virginia.edu:18888/api/companies/'+company_name);
    return this.problemsObservable;
 }

  getProblemTag(tag_name) {
  this.problemsObservable = this.http.get<Problem[]>('http://power3.cs.virginia.edu:18888/api/tags/'+tag_name);
  return this.problemsObservable;
  }

  getProblemDetail() {
    this.problemDetailObservable = this.http.get<ProblemDetail>(this.url4detailproblem);
    return this.problemDetailObservable;
  }

  createProblem(inputValues) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log(inputValues.description);
    console.log(inputValues.title);
    console.log(inputValues.difficulty);
    console.log(inputValues.company);
    console.log(inputValues.tag);
    
    let difficulty: number = 1;
    if (inputValues.difficulty == "Easy")
      difficulty = 1;
    else if (inputValues.difficulty == "Medium")
      difficulty = 2;
    else if (inputValues.difficulty == "Hard")
      difficulty = 3;

    this.createObservable = this.http.post<Status>('http://power3.cs.virginia.edu:18888/api/problem/insert', JSON.stringify(
      {
        "problemId": -1,
        "description": inputValues.description,
        "title": inputValues.title,
        "difficulty": difficulty,
        "companyName": inputValues.company,
        "tag": inputValues.tag
      }), httpOptions);
    return this.createObservable;
  }

  deleteProblem(problem_id) {
    this.problemsObservable = this.http.get<Problem[]>('http://power3.cs.virginia.edu:18888/api/admin/delete/'+problem_id);
    return this.problemsObservable;
  }

  // updateProblem(resource) {
  //   return this.http.patch(this.url + '/' + resource.id, JSON.stringify({ isRead: true }))
  //     .map(response => response);     
  // }

}
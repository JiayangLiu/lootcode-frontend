import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {Subscription} from "rxjs";
import { HttpClientModule } from '@angular/common/http'; 
import { ProblemService } from '../services/problem.service';
import { ProblemDetail } from '../problems/problem.detail.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  problemID: string;
  subscriptionProblems: Subscription;
  problem: ProblemDetail = null;
  animal: string;
  name: string;

  constructor(
    private route: ActivatedRoute, 
    private authService: AuthService,
    private service: ProblemService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.problemID = params.get('id');
      console.log('problem_id: ',this.problemID);

    });
    console.log('user_id: ', this.authService.currentUser.userid)
    // this.subscriptionProblems = this.service.getProblemDetailPost(this.authService.currentUser.userid, this.problemID)
    //   .subscribe(problem => {
    //     this.problem = problem[0];
    //     console.log(this.problem);
    //   });

    this.subscriptionProblems = this.service.getProblemDetail()
      .subscribe(problem => {
        this.problem = problem[0];
        console.log(this.problem);
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      width: '800px',
      height: '500px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  getDifficulty(d: number){
    if (d == 1){
      return 'easy';
    }
    if (d == 2){
      return 'medium';
    }
    if (d == 3){
      return 'hard';
    }
  }

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogContentExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
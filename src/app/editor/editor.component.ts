import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {Subscription} from "rxjs";
import { HttpClientModule } from '@angular/common/http'; 
import { ProblemService } from '../services/problem.service';
import { ProblemDetail } from '../problems/problem.detail.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl } from '@angular/forms';

export interface DialogData {
  user_id: string;
  problem_id: string;
}

export interface DialogData4Edit{
  user_id: string;
  problem_id: string;
  isAccepted: boolean;
  language: string;
  performance: number;
  code: string;
  note: string;
  created_time: string;
  code_id: number;
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  problemID: string;
  subscriptionProblems: Subscription;
  problem: any = null;
  animal: string;
  name: string;
  selected = new FormControl(0);

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
    console.log('user_id: ', this.authService.getUserId())
    this.subscriptionProblems = this.service.getProblemDetailPost(+this.authService.getUserId(), +this.problemID)
      .subscribe(problem => {
        this.problem = problem[0];
        console.log(this.problem);
      });

    // this.subscriptionProblems = this.service.getProblemDetail()
    //   .subscribe(problem => {
    //     this.problem = problem[0];
    //     console.log(this.problem);
    //   });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      width: '700px',
      height: '600px',
      data: {user_id: this.authService.getUserId(), problem_id: this.problemID, self:this}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialog4edit(): void {
    console.log("tabValue: ",this.selected.value);
    let value = this.problem.codeList[this.selected.value];
    let today = new Date(value.createTime);
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var old = date+' '+time;
    const dialogRef = this.dialog.open(DialogContentExampleDialog4edit, {
      width: '700px',
      height: '600px',
      data: {
        user_id: this.authService.getUserId(), 
        problem_id: this.problemID,
        code_id: value.codeId,
        isAccepted: value.isAccepted == 1? true: false,
        language: value.codeLanguage,
        performance: value.performance,
        code: value.content,
        note: value.note.content,
        created_time: old
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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
  styleUrls: ['dialog-content-example-dialog.css']
})
export class DialogContentExampleDialog {
  subscriptionUpdate: Subscription;
  selected = 'Java';
  toggleValue: boolean = false;
  perfomanceValue:string;
  codeValue:string;
  noteValue:string;
  status:number;

  constructor(
    private service: ProblemService,
    private route: Router,
    public dialogRef: MatDialogRef<DialogContentExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onClickSubmit(): void {
    this.dialogRef.close();
    console.log(this.toggleValue);
    console.log(this.selected);
    console.log(this.perfomanceValue);
    console.log(this.codeValue);
    console.log(this.noteValue);

    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var cur = date+' '+time;

    console.log(cur);
    this.subscriptionUpdate = this.service.updateProblemDetailPost(+this.data.user_id, +this.data.problem_id,
      this.selected, this.toggleValue,+this.perfomanceValue,this.codeValue,this.noteValue, cur, cur)
      .subscribe(status => {
        this.status = status;
        console.log(this.status);
        let link = '/problems/' + this.data.problem_id;
        this.route.navigate([link]);
      });

  }

  onClickCancel(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-content-example-dialog4edit',
  templateUrl: 'dialog-content-example-dialog.html',
  styleUrls: ['dialog-content-example-dialog.css']
})
export class DialogContentExampleDialog4edit implements OnInit{
  subscriptionUpdate: Subscription;
  selected = 'Java';
  toggleValue: boolean = false;
  perfomanceValue:number;
  codeValue:string;
  noteValue:string;
  status:number;

  ngOnInit(){
    console.log("langugage", this.data.language);
    console.log("performance", this.data.performance);

    this.selected = this.data.language;
    this.toggleValue = this.data.isAccepted;
    this.perfomanceValue = this.data.performance;
    this.codeValue = this.data.code;
    this.noteValue = this.data.note;
  }

  constructor(
    private service: ProblemService,
    private route: Router,
    public dialogRef: MatDialogRef<DialogContentExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData4Edit) {}

  onClickSubmit(): void {
    this.dialogRef.close();
    console.log(this.toggleValue);
    console.log(this.selected);
    console.log(this.perfomanceValue);
    console.log(this.codeValue);
    console.log(this.noteValue);

    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var cur = date+' '+time;

    console.log(cur);
    this.subscriptionUpdate = this.service.updateCodeNotePost(+this.data.user_id, +this.data.problem_id, +this.data.code_id,
      this.selected, this.toggleValue,+this.perfomanceValue,this.codeValue,this.noteValue, this.data.created_time, cur)
      .subscribe(status => {
        this.status = status;
        console.log(this.status);
        let link = '/problems/' + this.data.problem_id;
        this.route.navigate([link]);
      });

  }

  onClickCancel(): void {
    this.dialogRef.close();
  }
}
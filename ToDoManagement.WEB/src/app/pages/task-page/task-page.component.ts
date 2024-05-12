import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task-service/task.service';
import { Task } from '../../Models/Task';
import { CookieHelperService } from '../../services/cookie-helper-service/cookie-helper.service';
import { TaskComponent } from '../../shared/task/task.component';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddTaskRequest } from '../../Models/AddTaskRequest';
import { SnackbarService } from '../../services/snackbar-service/snackbar.service';

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [
    TaskComponent,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss',
})
export class TaskPageComponent implements OnInit {
  tasks: Task[] = [];

  addTaskForm: FormGroup | any = null;

  constructor(
    private taskService: TaskService,
    private cookieService: CookieHelperService,
    private snackBarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.addTaskForm = new FormGroup({
      taskname: new FormControl('', Validators.required),
    });
    this.taskService
      .getTasks(this.cookieService.getCookies('username'))
      .subscribe((data: Task[]) => {
        this.tasks = data;
      });
  }

  addTask(): void {
    if (this.addTaskForm.valid) {
      this.taskService
        .addTasks({
          username: this.cookieService.getCookies('username'),
          taskName: this.addTaskForm.controls.taskname.value,
        } as AddTaskRequest)
        .subscribe((response: any) => {
          if (response == 'Success') {
            window.location.reload();
          } else {
            this.snackBarService.openSnackBar(
              'There was an error adding your task',
              'Close',
              'error'
            );
          }
        });
    }
  }
}

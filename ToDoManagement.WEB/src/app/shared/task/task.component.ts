import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../Models/Task';
import { MatIconModule } from '@angular/material/icon';
import { TaskService } from '../../services/task-service/task.service';
import { DeleteTaskRequest } from '../../Models/DeleteTaskRequest';
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
import { UpdateTaskRequest } from '../../Models/UpdateTaskRequest';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit {
  @Input() taskDetails!: Task;

  updateTaskForm: FormGroup | any = null;
  keepStatusChecked: boolean = true;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.updateTaskForm = new FormGroup({
      rid: new FormControl(this.taskDetails.recordID),
      name: new FormControl('', Validators.required),
      status: new FormControl(''),
    });
  }

  delete() {
    this.taskService
      .deleteTask({
        rid: this.taskDetails.recordID,
      } as DeleteTaskRequest)
      .subscribe((response: any) => {
        if (response == 'Success') {
          window.location.reload();
        }
      });
  }

  update() {
    console.log(this.keepStatusChecked);
    this.taskService
      .updateTask({
        rid: this.taskDetails.recordID,
        name: this.updateTaskForm.controls.name.value,
        status:
          this.keepStatusChecked == true
            ? this.taskDetails.status
            : this.updateTaskForm.controls.status.value,
      } as UpdateTaskRequest)
      .subscribe((response: any) => {
        if (response == 'Success') {
          window.location.reload();
        }
      });
  }
}

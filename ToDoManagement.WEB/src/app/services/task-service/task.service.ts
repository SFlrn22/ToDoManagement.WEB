import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { AddTaskRequest } from '../../Models/AddTaskRequest';
import { UpdateTaskRequest } from '../../Models/UpdateTaskRequest';
import { DeleteTaskRequest } from '../../Models/DeleteTaskRequest';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTasks(username: string): any {
    return this.http.get(this.apiUrl + `/GetTasks/?username=${username}`);
  }

  addTasks(request: AddTaskRequest): any {
    return this.http.post<any>(this.apiUrl + `/AddTask`, request);
  }

  updateTask(request: UpdateTaskRequest): any {
    return this.http.post<any>(this.apiUrl + `/UpdateTaskStatus`, request);
  }

  deleteTask(rid: DeleteTaskRequest): any {
    return this.http.post<any>(this.apiUrl + `/DeleteTask`, rid);
  }
}

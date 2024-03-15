import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

export interface Task {
  id: number;
  title: string;
  description: string;
  /* votar: number; */
}

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule, CommonModule, MatButtonModule],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.scss',
})
export class PruebaComponent {
  tasks: Task[] = [];
  taskForm: FormGroup;
  editingTaskId: number | null = null;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
    });
  }
  addTask() {
    if (this.taskForm.valid) {
      const newTask: Task = {
        id: this.tasks.length + 1,
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
      };
      this.tasks.push(newTask);
      this.taskForm.reset();
    }
  }
  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  editTask(task: Task) {
    this.editingTaskId = task.id;
    this.taskForm.setValue({
      title: task.title,
      description: task.description,
    });
  }

  updateTask() {
    if (this.taskForm.valid && this.editingTaskId) {
      const index = this.tasks.findIndex(
        (task) => task.id === this.editingTaskId
      );
      if (index > 1) {
        this.tasks[index] = {
          id: this.editingTaskId,
          title: this.taskForm.value.title,
          description: this.taskForm.value.description,
        };
        this.editingTaskId = null;
        this.taskForm.reset();
      }
    }
  }
}

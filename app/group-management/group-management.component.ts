// src/app/group-management/group-management.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-group-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Group Management</h2>
    <form (ngSubmit)="createGroup()">
      <label for="groupName">Group Name:</label>
      <input id="groupName" [(ngModel)]="groupName" name="groupName" required />
      <button type="submit">Create Group</button>
    </form>
    <ul>
      <li *ngFor="let group of groups">{{ group.name }}</li>
    </ul>
  `,
  styleUrls: ['./group-management.component.css']
})
export class GroupManagementComponent implements OnInit {
  groupName = '';
  groups: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadGroups();
  }

  loadGroups() {
    this.http.get<any[]>('/api/groups').subscribe(groups => {
      this.groups = groups;
    });
  }

  createGroup() {
    this.http.post('/api/createGroup', { groupName: this.groupName }).subscribe(() => {
      this.loadGroups(); // Refresh group list
      this.groupName = ''; // Clear input
    });
  }
}

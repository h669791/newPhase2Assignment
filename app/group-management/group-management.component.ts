import { Component } from '@angular/core';

@Component({
  selector: 'app-group-management',
  standalone: true,
  templateUrl: './group-management.component.html'
})
export class GroupManagementComponent {
  groups: string[] = [];
  groupName: string = '';

  createGroup() {
    this.groups.push(this.groupName);  // Add group to array
    this.groupName = '';  // Clear input
  }

  deleteGroup(group: string) {
    this.groups = this.groups.filter(g => g !== group);  // Remove group
  }
}

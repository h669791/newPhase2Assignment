import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  templateUrl: './logout.component.html'
})
export class LogoutComponent {

  constructor(private router: Router) {}

  ngOnInit() {
    localStorage.removeItem('user');  // Clear user session
    this.router.navigate(['/login']);  // Redirect to login page
  }
}

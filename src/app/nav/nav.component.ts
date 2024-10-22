/*
DISPLAY TEAM INSIGNIA.
NAVIGATE TO DIFFERENT APP FEATURES.
VISIBLE ALL THE TIME.
*/

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-component',
  standalone: false,
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}

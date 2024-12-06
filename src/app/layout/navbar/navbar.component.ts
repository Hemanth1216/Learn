import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavBar } from './navbar.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy{

  navBarOptions: NavBar[] = [
    { id: 1, title: 'Home', icon: 'bi bi-house', route: '/app/home'},
    { id: 2, title: 'Operations', icon: 'bi bi-grid-1x2', route: '/app/operations'},
    { id: 3, title: 'Table', icon: 'bi bi-table', route: '/app/table'},
    { id: 4, title: 'Profile', icon: 'bi bi-person', route: '/app/profile'},
  ];
  selectedTab: string = '';

  constructor() {
    
  }

  ngOnInit() {
  }

  onTabChange(selectedNavOption: NavBar) {
    console.log("Hello")
    this.selectedTab = selectedNavOption.title;
  }


  ngOnDestroy(): void {}

}

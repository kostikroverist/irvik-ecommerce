import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }
  public logout(): void {
    this.loginService.logout();
    this.router.navigate(['home']);
  }

}

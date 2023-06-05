import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtToken } from 'src/app/models/jwt-token';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-subscripcio',
  templateUrl: './subscripcio.component.html',
  styleUrls: ['./subscripcio.component.css']
})
export class SubscripcioComponent implements OnInit{
  
  username!: string;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private userService: UserService) {}

  ngOnInit(): void {
    this.username = this.tokenService.getUsername();
  }

  logOut(): void {
    this.tokenService.logOut();
    this.router.navigate(['/login']);
  }

  subscriure(): void {
    this.userService.subscribe(this.username).subscribe((data: JwtToken) => {
      this.tokenService.setToken(data.token);
      this.router.navigate(['/inici']);
    })
  }

}

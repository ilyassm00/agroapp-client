import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUser } from 'src/app/models/login-user';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  username!: string;
  password!: string;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
  }

  onLogin(): void {
    const dto = new LoginUser(this.username, this.password);
    this.authService.login(dto).subscribe(
      data => {
        this.tokenService.setToken(data.token);
        this.router.navigate(["/inici"]);
      },
      err => {
        this.toast.error(err.error.message, 'Error', {timeOut:3000, positionClass: 'toast-top-center'});
      }
    )
  }

}

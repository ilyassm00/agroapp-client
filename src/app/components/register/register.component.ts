import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateUser } from 'src/app/models/create-user';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  username!: string;
  email!: string;
  password!: string;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
  }

  onRegister(): void {
    const dto = new CreateUser(this.username, this.email, this.password);
    this.authService.register(dto).subscribe(
      data => {
        this.toast.success('Usuari Creat', '', {timeOut:3000, positionClass: 'toast-top-center'});
        this.router.navigate(['/login']);
      },
      err => {
        this.toast.error(err.error.message, 'Error', {timeOut:3000, positionClass: 'toast-top-center'});
      }
    );
  }
}

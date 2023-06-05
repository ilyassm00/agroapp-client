import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Municipi } from 'src/app/models/municipi.model';
import { User } from 'src/app/models/user.model';
import { ReferenciaService } from 'src/app/services/referencia.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  username!: string;
  user!: User;
  municipis: Municipi[] = [];
  codiMunicipi!: number;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private userService: UserService,
    private referenciaService: ReferenciaService
  ) {}

  ngOnInit(): void {
    this.username = this.tokenService.getUsername();
    this.userService.getUserByUsername(this.username).subscribe((user: User) => {
      this.user = user;
      user.localitzacions.forEach((localitzacio: number) => {
        this.referenciaService.getMunicipiById(localitzacio).subscribe((municipi: Municipi) => {
          this.municipis.push(municipi);
        });
      });
    });
  }

  entrarLocalitzacio(): void{
    this.router.navigate(['/menu'], {queryParams: {
      codiMunicipi: this.codiMunicipi
    }});
  }

  logOut(): void {
    this.tokenService.logOut();
    this.router.navigate(['/login']);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReferenciaService } from 'src/app/services/referencia.service';
import { Municipi } from 'src/app/models/municipi.model';
import { TokenService } from 'src/app/services/token.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  username!: string;
  codiMunicipi: number = -1;
  municipi: Municipi | undefined;
  favorit: boolean = false;
  
  constructor(
    private referenciaService: ReferenciaService,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private userService: UserService,
    private router: Router){}
  
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.codiMunicipi = params['codiMunicipi'];
      if(this.codiMunicipi === undefined) {
        this.router.navigate(['/inici']);
      }
    })
    this.referenciaService.getMunicipiById(this.codiMunicipi).subscribe((municipi: Municipi) => {
      this.municipi = municipi;
    });
    this.username = this.tokenService.getUsername();
    this.userService.getUserByUsername(this.username).subscribe((user: User) => {
      user.localitzacions.forEach((localitzacio: number) => {
        if (localitzacio == this.codiMunicipi) {
          this.favorit = true;
        }
      });
    });
  }

  selectEstacions() {
    this.router.navigate(['/estacions'], {queryParams: {
      codiMunicipi: this.codiMunicipi
    }});
  }

  selectPrediccio() {
    this.router.navigate(['/prediccio'], {queryParams: {
      codiMunicipi: this.codiMunicipi
    }});
  }

  selectEstatAigua() {
    this.router.navigate(['/estat-aigua'], {queryParams: {
      codiMunicipi: this.codiMunicipi
    }});
  }

  changeFav(): void{
    this.favorit = !this.favorit;
    if (this.favorit) {
      this.userService.addLocalitzacio(this.username, this.codiMunicipi).subscribe();
    } else {
      this.userService.removeLocalitzacio(this.username, this.codiMunicipi).subscribe();
    }
  }
}

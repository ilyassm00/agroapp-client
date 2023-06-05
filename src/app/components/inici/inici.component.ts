import { Component, OnInit } from '@angular/core';
import { ReferenciaService } from '../../services/referencia.service';
import { Comarca } from '../../models/comarca.model';
import { Municipi } from '../../models/municipi.model';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-inici',
  templateUrl: './inici.component.html',
  styleUrls: ['./inici.component.css']
})
export class IniciComponent implements OnInit{
  comarques: Comarca[] = [];
  municipis: Municipi[] = [];
  codiComarca: number | undefined;
  codiMunicipi: number | undefined;
  username!: string;

  constructor(
    private router: Router,
    private referenciaService: ReferenciaService,
    private tokenService: TokenService) {}

  ngOnInit(): void {
    this.username = this.tokenService.getUsername();
    this.getCombos().then( () => {});
  }

  async getCombos() {
    await this.getComarques();
  }

  async getComarques() {
    await this.referenciaService.getComarques().subscribe((comarques: Comarca[]) => {
      this.comarques = comarques;
    })
  }

  buscarMunicipis() {
    if (this.codiComarca !== undefined) {
      this.referenciaService.getMunicipisByComarca(this.codiComarca).subscribe((municipis: Municipi[]) => {
        this.municipis = municipis;
      });
    } else {
      this.municipis = [];
    }
  }

  navegarMenu() {
    this.router.navigate(['/menu'], {queryParams: {
      codiMunicipi: this.codiMunicipi
    }});
  }

  logOut(): void {
    this.tokenService.logOut();
    this.router.navigate(['/login']);
  }
}

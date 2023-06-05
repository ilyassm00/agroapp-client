import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estacio } from 'src/app/models/estacio.model';
import { Municipi } from 'src/app/models/municipi.model';
import { ReferenciaService } from 'src/app/services/referencia.service';

@Component({
  selector: 'app-estacions',
  templateUrl: './estacions.component.html',
  styleUrls: ['./estacions.component.css']
})
export class EstacionsComponent implements OnInit{
  codiMunicipi: number = -1;
  municipi: Municipi | undefined;
  estacions: Estacio[] = [];
  
  constructor(
    private referenciaService: ReferenciaService,
    private activatedRoute: ActivatedRoute,
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
    this.referenciaService.getEstacionsByCodMunicipi(this.codiMunicipi).subscribe((estacions: Estacio[]) => {
      this.estacions = estacions;
    })
  }

  goBack() {
    this.router.navigate(['/menu'], {queryParams: {
      codiMunicipi: this.codiMunicipi
    }});
  }

  detailEstacio(id: string, estat: number){
    if (estat == 2) {
      this.router.navigate(['/estacions', id]);
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Municipi } from 'src/app/models/municipi.model';
import { PuntoControl } from 'src/app/models/puntoControl.model';
import { puntoControlService } from 'src/app/services/puntoControl.service';
import { ReferenciaService } from 'src/app/services/referencia.service';

@Component({
  selector: 'app-estat-aigua',
  templateUrl: './estat-aigua.component.html',
  styleUrls: ['./estat-aigua.component.css']
})
export class EstatAiguaComponent implements OnInit{
  codiMunicipi: number = -1;
  municipi: Municipi | undefined;
  puntosControl: PuntoControl[] = [];
  remotas: string[] = [];
  remotaSeleccionada: string = "Tots";
  puntosControlFiltrados: PuntoControl[] = [];
  
  constructor(
    private referenciaService: ReferenciaService,
    private puntoControlService: puntoControlService,
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
    this.puntoControlService.getPuntosControl().subscribe((puntosControl: PuntoControl[]) => {
      this.puntosControl = puntosControl;
      this.puntosControlFiltrados = puntosControl;
      this.remotas.push("Tots");
      this.puntosControl.forEach((puntoControl: PuntoControl) => {
        if (!this.remotas.includes(puntoControl.remota)) {
          this.remotas.push(puntoControl.remota);
        }
      })
    })
  }

  filtrar() {
    if (this.remotaSeleccionada == "Tots") {
      this.puntosControlFiltrados = this.puntosControl;
    } else {
      this.puntosControlFiltrados = [];
      this.puntosControl.forEach((puntoControl: PuntoControl) => {
        if (puntoControl.remota == this.remotaSeleccionada) {
          this.puntosControlFiltrados.push(puntoControl);
        }
      })
    }
  }

  goBack() {
    this.router.navigate(['/menu'], {queryParams: {
      codiMunicipi: this.codiMunicipi
    }});
  }
}

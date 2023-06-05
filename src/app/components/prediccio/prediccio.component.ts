import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EstatCel } from 'src/app/models/estatCel.model';
import { Municipi } from 'src/app/models/municipi.model';
import {
  DiesDiaria,
  PrediccioDiaria,
} from 'src/app/models/prediccioDiaria.model';
import { PrediccioHoraria, ValorsHoraria } from 'src/app/models/prediccioHoraria.model';
import { PrediccioUvi, Uvi, UviHoraria } from 'src/app/models/prediccioUvi.model';
import { PrediccioService } from 'src/app/services/prediccio.service';
import { ReferenciaService } from 'src/app/services/referencia.service';

@Component({
  selector: 'app-prediccio',
  templateUrl: './prediccio.component.html',
  styleUrls: ['./prediccio.component.css'],
})
export class PrediccioComponent implements OnInit {
  codiMunicipi: number = -1;
  municipi: Municipi | undefined;
  prueba: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  prediccioHoraria: PrediccioHoraria | undefined;
  prediccioDiaria: PrediccioDiaria | undefined;
  prediccioUvi: PrediccioUvi | undefined;
  diaSelected = 0;
  graficaTemperatura = true;
  graficaPrecipitacio = false;
  horesData: string[] = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
  temperaturaData: number[] = [];
  precipitacioData: number[] = [];
  uviData1: number[] = [];
  uviData2: number[] = [];
  uviData3: number[] = [];
  uviColors1: string[] = [];
  uviColors2: string[] = [];
  uviColors3: string[] = [];
  lineChartTemperatura = {
    labels: this.horesData,
    datasets: [
      {
        data: this.temperaturaData,
        label: 'ºC',
        fill: true,
        backgroundColor: 'rgb(246, 211, 97)',
        borderColor: 'rgb(204, 153, 0)',
        pointBorderColor: 'rgb(0, 0, 0)',
        pointBackgroundColor: 'rgb(0, 0, 0)',
        tension: 0.5,
      },
    ],
  };

  lineChartPrecipitacions = {
    labels: this.horesData,
    datasets: [
      {
        data: this.precipitacioData,
        label: '%',
        fill: true,
        backgroundColor: 'rgb(120, 194, 232)',
        borderColor: 'rgb(17, 148, 213)',
        pointBorderColor: 'rgb(0, 0, 0)',
        pointBackgroundColor: 'rgb(0, 0, 0)',
        tension: 0.5,
      },
    ],
  };

  barChart1 = {
    labels: this.horesData,
    datasets: [{
      label: 'UVI',
      data: this.uviData1,
      fill: false,
      backgroundColor: this.uviColors1,
      borderColor: [
        'rgb(255, 255, 255)'
      ],
      borderWidth: 1
    }]
  };

  barChart2 = {
    labels: this.horesData,
    datasets: [{
      label: 'UVI',
      data: this.uviData2,
      fill: false,
      backgroundColor: this.uviColors2,
      borderColor: [
        'rgb(255, 255, 255)'
      ],
      borderWidth: 1
    }]
  };

  barChart3 = {
    labels: this.horesData,
    datasets: [{
      label: 'UVI',
      data: this.uviData3,
      fill: false,
      backgroundColor: this.uviColors3,
      borderColor: [
        'rgb(255, 255, 255)'
      ],
      borderWidth: 1
    }]
  };

  constructor(
    private referenciaService: ReferenciaService,
    private prediccioService: PrediccioService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.codiMunicipi = params['codiMunicipi'];
      if (this.codiMunicipi === undefined) {
        this.router.navigate(['/inici']);
      }
    });
    this.referenciaService
      .getMunicipiById(this.codiMunicipi)
      .subscribe((municipi: Municipi) => {
        this.municipi = municipi;
      });
    this.updateLineCharts(0);
    this.updateBarCharts();


    this.prediccioService.getPrediccioHoraria(this.codiMunicipi).subscribe((prediccioHoraria: PrediccioHoraria) => {
      this.prediccioHoraria = prediccioHoraria;
      this.updateLineCharts(0);
    })
    this.prediccioService.getPrediccioDiaria(this.codiMunicipi).subscribe((prediccioDiaria: PrediccioDiaria) => {
      this.prediccioDiaria = prediccioDiaria;
      this.prediccioDiaria.dies.forEach((dies: DiesDiaria) => {
        this.referenciaService.getEstatCelByCodi(dies.variables.estatCel.valor).subscribe((estatCel: EstatCel) => {
          dies.estatCel = estatCel;
        })
      })
    })
    this.prediccioService.getPrediccioUvi(this.codiMunicipi).subscribe((prediccioUvi: PrediccioUvi) => {
      this.prediccioUvi = prediccioUvi;
      this.updateBarCharts();
    })
  }

  goBack() {
    this.router.navigate(['/menu'], {
      queryParams: {
        codiMunicipi: this.codiMunicipi,
      },
    });
  }

  selectDia(index: number) {
    this.diaSelected = index;
    this.updateLineCharts(index);
  }

  selectGraficaTemperatura() {
    this.graficaTemperatura = true;
    this.graficaPrecipitacio = false;
  }

  selectGraficaPrecipitacio() {
    this.graficaPrecipitacio = true;
    this.graficaTemperatura = false;
  }

  updateLineCharts(index: number) {
    if (this.prediccioHoraria != undefined && index < 3) {
      this.temperaturaData = [];
      this.prediccioHoraria.dies[index].variables.temp.valors.forEach((data: ValorsHoraria) => {
        this.temperaturaData.push(+data.valor);
      });
      this.lineChartTemperatura = {
        labels: this.horesData,
        datasets: [
          {
            data: this.temperaturaData,
            label: 'ºC',
            fill: true,
            backgroundColor: 'rgb(246, 211, 97)',
            borderColor: 'rgb(204, 153, 0)',
            pointBorderColor: 'rgb(0, 0, 0)',
            pointBackgroundColor: 'rgb(0, 0, 0)',
            tension: 0.5,
          },
        ],
      };

      this.precipitacioData = [];
      this.prediccioHoraria.dies[index].variables.precipitacio.valors.forEach((data: ValorsHoraria) => {
        this.precipitacioData.push(+data.valor);
      });   
      this.lineChartPrecipitacions = {
        labels: this.horesData,
        datasets: [
          {
            data: this.precipitacioData,
            label: '%',
            fill: true,
            backgroundColor: 'rgb(120, 194, 232)',
            borderColor: 'rgb(17, 148, 213)',
            pointBorderColor: 'rgb(0, 0, 0)',
            pointBackgroundColor: 'rgb(0, 0, 0)',
            tension: 0.5,
          },
        ],
      };
    }
  }

  updateBarCharts() {
    this.prediccioUvi?.uvi[0].hours.forEach((data: UviHoraria) => {
      this.uviData1.push(data.uvi);
    });
    this.uviColors1 = this.getColorsOfUvi(this.uviData1);
    this.barChart1 = {
      labels: this.horesData,
      datasets: [{
        label: 'UVI',
        data: this.uviData1,
        fill: false,
        backgroundColor: this.uviColors1,
        borderColor: [
          'rgb(255, 255, 255)'
        ],
        borderWidth: 1
      }]
    };

    this.prediccioUvi?.uvi[1].hours.forEach((data: UviHoraria) => {
      this.uviData2.push(data.uvi);
    });
    this.uviColors2 = this.getColorsOfUvi(this.uviData2);
    this.barChart2 = {
      labels: this.horesData,
      datasets: [{
        label: 'UVI',
        data: this.uviData2,
        fill: false,
        backgroundColor: this.uviColors2,
        borderColor: [
          'rgb(255, 255, 255)'
        ],
        borderWidth: 1
      }]
    };

    this.prediccioUvi?.uvi[2].hours.forEach((data: UviHoraria) => {
      this.uviData3.push(data.uvi);
    });
    this.uviColors3 = this.getColorsOfUvi(this.uviData3);
    this.barChart3 = {
      labels: this.horesData,
      datasets: [{
        label: 'UVI',
        data: this.uviData3,
        fill: false,
        backgroundColor: this.uviColors3,
        borderColor: [
          'rgb(255, 255, 255)'
        ],
        borderWidth: 1
      }]
    };
  }

  getColorsOfUvi(uviData: number[]): string[] {
    let color: string[] = [];
    uviData.forEach((data: number) => {
      if (data>=0&&data<=2) {
        color.push('rgb(0, 255, 0)');
      } else if (data>=3&&data<=5) {
        color.push('rgb(255, 255, 0)');
      } else if (data>=6&&data<=7) {
        color.push('rgb(255, 128, 0)');
      } else if (data>=8&&data<=10) {
        color.push('rgb(255, 0, 0)');
      } else {
        color.push('rgb(153, 51, 255)');
      }
    })
    return color;
  }
}

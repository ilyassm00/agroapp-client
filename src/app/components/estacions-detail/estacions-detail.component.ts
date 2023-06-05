import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estacio } from 'src/app/models/estacio.model';
import { MultiVariableMesurada } from 'src/app/models/multiVariableMesurada.model';
import { User } from 'src/app/models/user.model';
import { VariableMeteo } from 'src/app/models/variableMeteo.model';
import {
  VariableMesurada,
  VariablesEstacio,
} from 'src/app/models/variablesEstacio.model';
import { ReferenciaService } from 'src/app/services/referencia.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { XemaService } from 'src/app/services/xema.service';

@Component({
  selector: 'app-estacions-detail',
  templateUrl: './estacions-detail.component.html',
  styleUrls: ['./estacions-detail.component.css'],
})
export class EstacionsDetailComponent implements OnInit {
  username!: string;
  codiEstacio: string = '';
  estacio: Estacio | undefined;
  variablesData: VariableMesurada[] = [];
  multiVariableData: MultiVariableMesurada | undefined;

  codisVariablesPreferides: number[] = [];
  variablesPreferides: VariableMesurada[] = [];
  multiVariablePreferida: MultiVariableMesurada | undefined;
  variables: VariableMesurada[] = [];
  multiVariable: MultiVariableMesurada | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private xemaService: XemaService,
    private referenciaService: ReferenciaService,
    private tokenService: TokenService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.codiEstacio = params['id'];
    });
    this.xemaService
      .getVariables(this.codiEstacio)
      .subscribe((result: VariablesEstacio[]) => {
        result[0].variables.forEach((variableMesurada: VariableMesurada) => {
          this.referenciaService
            .getVariableById(variableMesurada.codi)
            .subscribe((variable: VariableMeteo) => {
              variableMesurada.variable = variable;
              this.variablesData.push(variableMesurada);
              this.sortLlistes();
            });
        });
        this.sortLlistes();
      });
    this.xemaService
      .getMultiVariables(this.codiEstacio)
      .subscribe((multiVariable: MultiVariableMesurada) => {
        this.referenciaService
          .getVariableById(multiVariable.codi)
          .subscribe((variable: VariableMeteo) => {
            multiVariable.variable = variable;
            this.multiVariableData = multiVariable;
            this.sortLlistes();
          });
      });
    this.referenciaService
      .getEstacioById(this.codiEstacio)
      .subscribe((estacio: Estacio) => {
        this.estacio = estacio;
      });
    this.username = this.tokenService.getUsername();
    this.userService
      .getUserByUsername(this.username)
      .subscribe((user: User) => {
        user.variables.forEach((variable: number) => {
          this.codisVariablesPreferides.push(variable);
        });
        this.sortLlistes();
      });
  }

  selectFav(codiVariable: number): void {
    this.userService.addVariable(this.username, codiVariable).subscribe(() => {
      this.codisVariablesPreferides.push(codiVariable);
      this.sortLlistes();
    });
  }

  unSelectFav(codiVariable: number): void {
    this.userService
      .removeVariable(this.username, codiVariable)
      .subscribe(() => {
        this.codisVariablesPreferides.splice(
          this.codisVariablesPreferides.indexOf(codiVariable),
          1
        );
        this.sortLlistes();
      });
  }

  sortLlistes(): void {
    if (this.codisVariablesPreferides.length == 0) {
      this.variablesPreferides = [];
      this.multiVariablePreferida = undefined;
      this.variables = this.variablesData;
      this.multiVariable = this.multiVariableData;
    } else {
      this.variablesPreferides = [];
      this.multiVariablePreferida = undefined;
      this.variables = [];
      this.multiVariable = undefined;
      if (this.codisVariablesPreferides.includes(6006)) {
        this.multiVariablePreferida = this.multiVariableData;
      } else {
        this.multiVariable = this.multiVariableData;
      }
      this.variablesData.forEach((variableData: VariableMesurada) => {
        let preferida = false;
        this.codisVariablesPreferides.forEach((variable: number) => {
          if (variableData.codi == variable) {
            preferida = true;
          } 
        });
        if (preferida) {
          this.variablesPreferides.push(variableData);
        } else {
          this.variables.push(variableData);
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/estacions'], {
      queryParams: {
        codiMunicipi: this.estacio?.municipi.codi,
      },
    });
  }
}

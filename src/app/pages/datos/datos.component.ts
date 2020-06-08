import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.scss']
})
export class DatosComponent implements OnInit {
  forma: FormGroup;
  clientes: string[] = ['Claro', 'Entel', 'BCP', 'BBVA', 'interbank'];
  constructor() {
    this.forma = new FormGroup({
      nombreCompleto: new FormGroup({
        nombre: new FormControl('', [Validators.required, Validators.minLength(4), this.noRicardo]),
        apellido: new FormControl('',[Validators.required, Validators.minLength(4), this.noArana])
      }),
      usuario: new FormControl('', [Validators.required,Validators.minLength(4), this.noNick], this.existeUsuario),
      pass: new FormControl('', [Validators.required,Validators.minLength(6), this.noPassword]),
      pass2: new FormControl('', [Validators.required, Validators.minLength(6), this.noPassword2]),
      correo: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      cliente: new FormControl('', Validators.required),
      cargo: new FormControl('', [Validators.required,Validators.minLength(4), this.noGerente]),
      vacaciones: new FormControl(false, Validators.required),
      intereses: new FormArray([
        new FormControl('',Validators.required)
      ])
    });

    this.forma.controls.pass2.setValidators([
      Validators.required,
      this.noIgual.bind(this.forma) // this.forma = this
    ]);
   }

  ngOnInit(): void {
  }

  guardar() {
    console.log(this.forma);
  }

  agregarIntereses() {
    const intereses = this.forma.controls.intereses as FormArray;
    intereses.push(new FormControl('', Validators.required));
  }

  noRicardo(control: FormControl): {[s: string]: boolean} {
    if(control.value === 'Ricardo') {
      return { noRicardo: true };
    }
  }

  noGerente(control: FormControl): {[s: string]: boolean} {
    if(control.value === 'Gerente') {
      return { noGerente: true };
    }
  }

  noNick(control: FormControl): {[s: string]: boolean} {
    if(control.value === 'ricky') {
      return { noNick: true };
    }
  }

  noArana(control: FormControl): {[s: string]: boolean} {
    if(control.value === 'Arana') {
      return { noArana: true };
    }
  }

  noPassword(control: FormControl): {[s: string]: boolean} {
    if(control.value === 'Administrador') {
      return { noPassword: true };
    }
  }
  noPassword2(control: FormControl): {[s: string]: boolean} {
    if(control.value === 'Administrador') {
      return { noPassword2: true };
    }
  }

  noIgual(control: FormControl): {[s: string]: boolean} {
    const forma: any = this; // this = this.forma
    if(control.value !== forma.controls.pass.value) {
      return { noigual: true };
    }
  }

  existeUsuario(control: FormControl): Promise<any> | Observable<any> {
    const promesa = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          if(control.value === 'ricky') {
            resolve({existe: true});
          } else {
            resolve(null);
          }
        }, 3000);
      }
    );
    return promesa;
  } 

}
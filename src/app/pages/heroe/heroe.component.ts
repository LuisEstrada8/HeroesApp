import { Component, OnInit, NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HereoModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css'],
})
export class HeroeComponent implements OnInit {
  heroe = new HereoModel();

  constructor(private heroeService: HeroesService,private route:ActivatedRoute) {}

  ngOnInit(): void {

  const id = this.route.snapshot.paramMap.get('id');
  if (id !== 'nuevo'){
    this.heroeService.getHeroe(id).subscribe((data: HereoModel) => {
      this.heroe = data;
      this.heroe.id=id;
    });
  }

  }

  guardar(form: NgForm) {
    if (form.invalid) {
      console.log('Foormulario no validao');
      return;
    }

 Swal.fire({
   title: 'Espere',
   text: 'Guardando informacion',
   icon: 'info',
   allowOutsideClick: false,
 });
Swal.showLoading();

let peticion : Observable<any>;



    if (this.heroe.id) {

     peticion = this.heroeService.actualizarHeroe(this.heroe);
     peticion.subscribe(data=>{
    
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizo',
        icon: 'success',
      });
  
    })
    } else {
      peticion = this.heroeService.crearHeroe(this.heroe);
      peticion.subscribe(data=>{
    
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se Añadio',
        icon: 'success',
      });
  
    })
    
    }

  

  }
}

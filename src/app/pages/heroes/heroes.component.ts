import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HereoModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HereoModel []=[];
  cargando = true;

  constructor( private heroesService: HeroesService ) { }

  ngOnInit(): void {

  this.cargando=true;
  this.heroesService.getHeroes().subscribe(data=>{
    this.heroes=data;
    this.cargando=false;
  });

  }

  borrar(heroe: HereoModel, i:number){

    Swal.fire({
      title:'Eliminar',
      text: 'Seguro que desea eliminar a este Heroe',
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true

    }).then(data=>{

    if(data.value){

      this.heroes.splice(i,1);
      this.heroesService.DeletHeroe(heroe.id).subscribe(data=>{});

    }
    

    });

    
  }

}

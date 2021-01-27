import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HereoModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url ='https://crud-angular-59c6c.firebaseio.com';


  constructor( private http:HttpClient ) { }

  crearHeroe( heroe: HereoModel) {
  
    return this.http.post(`${this.url}/heroes.json`, heroe )
               .pipe(
                 map( (data: any) =>{
                  heroe.id=data.name;
                  return heroe;
                 })
               );
              }


actualizarHeroe( heroe:HereoModel ){

  const heroeTemp = {...heroe};

  delete heroeTemp.id;


  return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);

}

getHeroes(){
  return this.http.get(`${this.url}/heroes.json`).pipe(
    map(this.crearArreglo),
    delay(1500));
}

private crearArreglo(heroesObj: object){

  const heroes: HereoModel[]=[];
  console.log(heroesObj);

  Object.keys(heroesObj).forEach(key =>{
    const heroe: HereoModel = heroesObj[key];

    heroe.id=key;

    heroes.push(heroe);

  
  });

  if(heroesObj == null){return [];}
  return heroes;

}

getHeroe(id:string){
return this.http.get(`${this.url}/heroes/${id}.json`);
}

DeletHeroe(id:string){
  return this.http.delete(`${this.url}/heroes/${id}.json`);

}

}

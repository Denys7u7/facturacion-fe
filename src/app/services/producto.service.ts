import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  url = 'http://localhost:8080/producto';

  constructor(private htpp: HttpClient) {}

  getAllPrductos(): Observable<Producto[]> {
    return this.htpp.get<Producto[]>(this.url);
  }

  actualizarPrecio(id: number, precio: number) {
    const request = {
      id: id,
      precio: precio,
    };
    return this.htpp.post(this.url + '/precio', request);
  }

  crearProducto(nombre: string, precio: number) {
    const request = {
      nombre,
      precio,
    };
    return this.htpp.post(this.url, request);
  }

  actualizarProducto(id: number, nombre: string, precio: number) {
    const request = {
      id,
      nombre,
      precio,
    };
    return this.htpp.put(this.url, request);
  }
}

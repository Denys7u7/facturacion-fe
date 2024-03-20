import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrdenCompra } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root',
})
export class OrdenCompraService {
  url = 'http://localhost:8080/ordenCompra';

  constructor(private htpp: HttpClient) {}

  getAllOrdenCompra(): Observable<OrdenCompra[]> {
    return this.htpp.get<OrdenCompra[]>(this.url);
  }

  crearOrdenCompra(): Observable<OrdenCompra> {
    const request = {
      fecha: new Date(),
    };
    return this.htpp.post<OrdenCompra>(this.url, request);
  }

  actualizarOrdenCompra(id: number, total: number): Observable<OrdenCompra> {
    const request = {
      id: id,
      total: total,
    };
    return this.htpp.put<OrdenCompra>(this.url, request);
  }
}

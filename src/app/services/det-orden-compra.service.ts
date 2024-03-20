import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetOrdenCompra } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root',
})
export class DetOrdenCompraService {
  url = 'http://localhost:8080/detOrdenCompra';

  constructor(private htpp: HttpClient) {}

  getAllDetOrdenCompra(): Observable<DetOrdenCompra[]> {
    return this.htpp.get<DetOrdenCompra[]>(this.url);
  }

  saveDetOrdenCompra(
    idOrden: number,
    idProducto: number
  ): Observable<DetOrdenCompra> {
    const request = {
      ordenCompra: { id: idOrden },
      producto: { id: idProducto },
    };

    return this.htpp.post<DetOrdenCompra>(this.url, request);
  }
}

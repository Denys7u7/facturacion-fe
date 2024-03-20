export interface DetOrdenCompra {
  id: number;
  ordenCompra: OrdenCompra;
  producto: Producto;
}

export interface OrdenCompra {
  id: number;
  fecha: Date;
  total: number;
}

export interface Producto {
  id?: number;
  nombre: string;
  precio: number;
}

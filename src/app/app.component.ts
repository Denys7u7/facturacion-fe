import { ProductoService } from './services/producto.service';
import { OrdenCompraService } from './services/orden-compra.service';
import {
  DetOrdenCompra,
  OrdenCompra,
  Producto,
} from './interfaces/producto.interface';
import { DetOrdenCompraService } from './services/det-orden-compra.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'facturacion-fe';

  productos: Producto[] = [];
  id!: number;
  precio!: number;

  ordenCompra?: OrdenCompra;

  carrito: Producto[] = [];

  producto: Producto = { nombre: '', precio: 0 };

  constructor(
    private detOrdenCompraService: DetOrdenCompraService,
    private ordenCompraService: OrdenCompraService,
    private productoService: ProductoService
  ) {
    detOrdenCompraService.getAllDetOrdenCompra().subscribe({
      next: (response: DetOrdenCompra[]) => {
        console.log(response);
      },
    });

    ordenCompraService.getAllOrdenCompra().subscribe({
      next: (response: OrdenCompra[]) => {
        console.log(response);
      },
    });

    this.getAllProductos();
  }

  getAllProductos() {
    this.productoService.getAllPrductos().subscribe({
      next: (response: Producto[]) => {
        this.productos = response;
        console.log(response);
      },
    });
  }

  actualizarPrecio(): void {
    console.log(this.id, this.precio);

    this.productoService.actualizarPrecio(this.id, this.precio).subscribe({
      next: (response) => {
        this.getAllProductos();
      },
    });
  }

  crearOrdenCompra(): void {
    this.ordenCompraService.crearOrdenCompra().subscribe({
      next: (value: OrdenCompra) => (this.ordenCompra = value),
    });
  }

  agregarProducto(producto: Producto): void {
    this.carrito.push(producto);
    this.detOrdenCompraService
      .saveDetOrdenCompra(this.ordenCompra?.id!, producto.id!)
      .subscribe({
        next: (value: DetOrdenCompra) => {
          console.log(value);
        },
      });
    console.log(this.carrito);
  }

  calcularTotal(carrito: Producto[]): number {
    let total: number = 0;
    carrito.forEach((p) => {
      total += p.precio;
    });
    return total;
  }

  actualizarOrdenComrpa() {
    this.ordenCompraService
      .actualizarOrdenCompra(
        this.ordenCompra?.id!,
        this.calcularTotal(this.carrito)
      )
      .subscribe({
        next: (value: OrdenCompra) => console.log(value),
      });
  }

  guardarProducto() {
    if (this.producto.id) {
      this.productoService
        .actualizarProducto(
          this.producto.id!,
          this.producto.nombre,
          this.producto.precio
        )
        .subscribe({
          next: (response) => {
            this.getAllProductos();
          },
        });
    } else
      this.productoService
        .crearProducto(this.producto.nombre, this.producto.precio)
        .subscribe({
          next: (response) => {
            this.getAllProductos();
          },
        });

    this.producto = {
      nombre: '',
      precio: 0,
    };
  }

  selecctionarProducto(p: Producto) {
    this.producto = p;
  }
}

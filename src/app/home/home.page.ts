import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../model/producto';
import { AlertController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  private productos;
  private carrito: Array<Producto>=[];
  private cantidad = 0;
  
  constructor(private prodSrv: ProductoService,
    private alContrl: AlertController,
    private lodading: LoadingController) {
     
  }
  
  public async ngOnInit() {
    this.carrito = this.prodSrv.carrito;
    
      const loading = await this.lodading.create();   
      loading.present();
    
 
    

    this.prodSrv.obtenerTodos().subscribe(datos => {
      
      this.productos = datos
      loading.dismiss();
    });
    
   
    
  }
  public async verCarrito(){
  
    let total = 0;
    let cuerpo = "";
    for (let prod of this.prodSrv.carrito) {
      cuerpo = cuerpo + prod.nombre + "<br>";
      total = total + prod.precio;
    }
    const cuerpoAleta = {
      header: "Lista de producto",
      
      message: cuerpo+"<br>Precio Total "+total,
      buttons: ["ok"]
    };
    const alerta = await this.alContrl.create(cuerpoAleta);

    await alerta.present();

 
    
  }

}

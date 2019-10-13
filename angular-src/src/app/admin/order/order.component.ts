import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
 
  constructor(private orderServ: OrderService) { }

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders(){
    return this.orderServ.getAll().subscribe((data:any) => {
      console.log(data);
    }, error => {
      console.log(error.error);
    });
  }
}

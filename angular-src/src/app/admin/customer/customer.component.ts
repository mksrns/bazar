import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/_services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
// import * as $ from 'jquery';
declare var $:any;

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customers: any;
  singleCustomer: any;
  addCustomerForm: FormGroup;
  updateCustomerForm: FormGroup;
  imageUrl: string = '/assets/images/more.png';
  fileToUpload: File = null;

  constructor(private customerServ: CustomerService, private formbuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.addCustomerForm = this.formbuilder.group({ 
      firstname:['', [Validators.required]], 
      street: ['', []],
      city: ['', [Validators.required]],
      tel1: ['', [Validators.required]],
      customerImage: ['']
    });
    this.updateCustomerForm = this.formbuilder.group({ 
      firstname:[''], 
      street: ['', []],
      city: [''],
      tel1: [''],
      customerImage: ['']
    });

    this.getAllCustomer(); 
  }

  openModal(){
    $('#modelId').modal();
  }
  closeModal(){
    $('#modelId').modal('hide');
  }

  getAllCustomer(){
    return this.customerServ.getAll().subscribe((data:any) => {
      this.customers = data.customer;
      console.log(this.customers);
    },
    error => {
      console.log(error);
    });
  }
  getSingleCustomer(customerId){
    return this.customerServ.getSingle(customerId).subscribe((data:any) => {
      this.singleCustomer = data.customer;
      console.log(data.customer);
    });
  }

  onSelectedFile(event){
    if(event.target.files.length > 0){
      const custImg = event.target.files[0];
      this.addCustomerForm.get('customerImage').setValue(custImg);
    }
    this.fileToUpload = event.target.files[0];
    console.log(this.fileToUpload);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  onCreate(){
    const formData = new FormData();
    formData.append('firstname', this.addCustomerForm.get('firstname').value);
    formData.append('street', this.addCustomerForm.get('street').value);
    formData.append('city', this.addCustomerForm.get('city').value);
    formData.append('tel1', this.addCustomerForm.get('tel1').value);
    formData.append('customerImage', this.addCustomerForm.get('customerImage').value);
    this.addCustomer(formData);
  }
  addCustomer(formData){
    this.customerServ.create(formData).subscribe(
      (event:any)=>{ 
        if(event.type === HttpEventType.UploadProgress){
          console.log('upload progress: ' + Math.round(event.loaded/event.total * 100) + '%');
        } else if(event.type === HttpEventType.Response){
          console.log(event);
          this.toastr.success("Customer added successfully");
          this.getAllCustomer();
          this.closeModal();
        }
    },
      error=>{
        console.log(error.error);
        this.toastr.error("Error Occured");
      }
    );
  }

  onSelectedFileUpdate(event){
    if(event.target.files.length > 0){
      const custImgUpdate = event.target.files[0];
      this.updateCustomerForm.get('customerImage').setValue(custImgUpdate);
    }
    this.fileToUpload = event.target.files[0];
    console.log(this.fileToUpload);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  onUpdate(customerId){ 
    const formDataUpdate = new FormData();
    formDataUpdate.append('firstname', this.updateCustomerForm.get('firstname').value);
    formDataUpdate.append('street', this.updateCustomerForm.get('street').value);
    formDataUpdate.append('city', this.updateCustomerForm.get('city').value);
    formDataUpdate.append('tel1', this.updateCustomerForm.get('tel1').value);
    formDataUpdate.append('customerImage', this.updateCustomerForm.get('customerImage').value);
    console.log(this.updateCustomerForm.get('customerImage').value);
    console.log(customerId);
    this.customerServ.update(customerId, formDataUpdate).subscribe(
      (data:any)=>{ 
        console.log(data);
        this.toastr.success("Customer updated successfully");
        this.getAllCustomer();
        this.closeModal();
      },
      error=>{
        console.log(error.error);
        this.toastr.error("Error Occured");
      }
    );
  }

  deleteCustomer(customerId){
    return this.customerServ.delete(customerId).subscribe((data:any) => {
      console.log(data);
      this.getAllCustomer();
      this.toastr.success('Customer deleted successfully');
    },
    error => {
      console.log(error);
      this.toastr.error('error occured');
    });
  }

} 

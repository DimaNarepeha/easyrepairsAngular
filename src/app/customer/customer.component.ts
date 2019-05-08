import {Component,OnInit} from '@angular/core';
import {Customer} from './customer';
import { CustomerService } from './customer.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
    selector:'customers',
    templateUrl:'./customer.component.html',
    styleUrls: ['./customer.component.css']
})


export class CustomerComponent implements OnInit{
       private page:number =0;
        customers: Customer[];
        customer = new Customer();
        private customerPage: Array<any>;
        private  pages:Array<number>;
        public userFile:any = File; 
        public im:any;
        constructor( private _customerService: CustomerService,private _sanitizer: DomSanitizer){}

        ngOnInit():void{
            this.getCustomersByPage();
        }

        setPage(i,event:any){
            event.preventDefault();
            this.page=i;
            this.getCustomersByPage();
            
        }


        serveImage(image:string){
           return this._customerService.getImage(image).subscribe(res => {
               this.im= this._sanitizer.bypassSecurityTrustUrl(res);
            console.log("!!!!!!!!!!!!!!"+this.im);
            
            
          }) ;
        }


        onSelectFile(event,id){
            const file = event.target.files[0];
           /*const fd = new FormData();
            fd.append('image',file);
            console.log(file);*/
            console.log(file);
            this.userFile=file; 
            this._customerService.uploadImage(file,id) .subscribe(res => {
                console.log(res);
                this.getCustomersByPage();
              });;
           
        }

        getCustomersByPage(){
            return this._customerService.getCustomersPage(this.page).subscribe(
                data=>{
                    console.log(data);
                    let d = data.json();
                     console.log(d);
                    //console.log("result = " + d.result);
                    this.customerPage= d['content'];
                    this.pages=new Array(d['totalPages']);
                    console.log(data['content']);
                    console.log( this.pages);
                    console.log( this.customerPage)
                    console.log(data)
                },
                 (error)=>{console.log(error);
                }
            );
        }

        getCustomers(): void{
            this._customerService.getAllCustomers().subscribe(
                (customerData)=>{this.customers=customerData,console.log(customerData)},
                 (error)=>{console.log(error);
                }
            );
        }

        addCustomer(): void{
            this._customerService.addCustomer(this.customer)
            .subscribe((response)=>{console.log(response);this.reset();this.getCustomersByPage();},
                (error) => {console.log(error);
                });
        }

        private reset(){
                this.customer.firstName=null;
                this.customer.lastName = null;
                this.customer.email=null;
        }

       deleteCustomer(customerId:string){
                this._customerService.deleteCustomer(customerId)
                .subscribe((response)=> {console.log(response);this.getCustomers();},
                (error)=>{console.log(error);} );

       }


       getCustomerById(customerId: string){
            this._customerService.getCustomerById(customerId)
            .subscribe((customerData)=>{this.customer = customerData; this.getCustomers();},(error)=>{
                    console.log(error);
            });
       }

}
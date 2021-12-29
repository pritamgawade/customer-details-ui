import { Constants } from './../config/constants';
import { ServicesService } from './../services.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  title: string = 'Customer Details';
  constructor(private service: ServicesService, public constants: Constants) { }
  successmsg: any;
  errormsg: any;
  selectedCountry: any;
  countries = this.constants.countries;
  canadaStates = this.constants.canadaStates;
  usStates = this.constants.usStates;
  countryList = this.constants.countries;
  countrySelected = true;
  id: any;
  states: any;
  isSubmitted = false;
  isVisible: any;
  ngOnInit(): void {
  }


  customerForm = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'email': new FormControl('', [Validators.email]),
    'contact': new FormControl('', [Validators.pattern("^[0-9]*$")]),
    'address': new FormGroup({
      'houseNumber': new FormControl('', [Validators.pattern("^[0-9]*$")]),
      'streetName': new FormControl('', [Validators.required]),
      'country': new FormControl('', [Validators.required]),
      'state': new FormControl('', [Validators.required]),
      'city': new FormControl('', [Validators.required])
    })
  });

  onlyNumberKey(event: any) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  onChangeCountry(event: any) {
    this.id = event.target.value
    if (this.id == '38: Object') {
      this.states = this.constants.canadaStates;
      this.countrySelected = false;
    } else if (event.target.value == '231: Object') {
      this.states = this.constants.usStates;
      this.countrySelected = false;
    }
    else {
      this.countrySelected = true;
    }
  }

  showAlert() {
    if (this.isVisible) { // if the alert is visible return
      return;
    }
    this.isVisible = true;
    setTimeout(() => this.isVisible = false, 2500); // hide the alert after 2.5s
  }

  customerSubmit() {
    console.log(this.customerForm.value)
    this.service.saveCustomerDetails(this.customerForm.value).subscribe((res) => {
      this.customerForm.reset();
      if (res.success == true) {
        this.successmsg = res.message;
      } else {
        console.log("errors", res.errors)
      }
    })
  }
}

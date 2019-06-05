import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import  {CommonService} from '../service/common.service';
declare var $: any;


@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	fullData : any;
	dataForm : FormGroup;

	constructor(private fb : FormBuilder, private router : Router, private _CommonService : CommonService)  {
		this.addCreateDataForm();
	}


	ngOnInit() {
		this.getFullData();
		if (localStorage.getItem('isLoggedIn') === 'true') {
				this.router.navigate(['dashboard']);
			} else{
					this.router.navigate(['/']);
				}
			}

			logOut() {
				localStorage.setItem('isLoggedIn', 'false');
				localStorage.removeItem('token');
				this.router.navigate(['/']);

			}

			// get method start here ....

			getFullData(){
				this._CommonService.getListData().subscribe(
					result =>{
						this.fullData = result.data.employees;
						console.log(result.data.employees);
					}, error => {
						console.log(error.toString());
					});
			}


			// get method end here ....


			// post method start here ....

			addCreateDataForm(){
				this.dataForm = this.fb.group({
					company :['', Validators.required],
					email :['', Validators.required],
					emp_id :['', Validators.required],
					// id :['', Validators.required],
					location :['', Validators.required],
					name :['', Validators.required],
					phone :['', Validators.required],

				});

			}

			dataClick(company, email, emp_id, location, name, phone){
				console.log(111);
				this._CommonService.addListData(company, email, emp_id, location, name, phone).subscribe(
					result => {
						this.ngOnInit();
						console.log(result);

					}, error => {

					});
			}



			// post method end here ....




			// delete method start here ....

			deleteClick(id){

				$('#'+id).show();
				$('#k'+id).attr("disabled", 'disabled');
				this._CommonService.deleteData(id).subscribe(

					result => {
						$('#'+id).hide();
						this.ngOnInit();

					}, error => {

						console.log(error.toString());
					}

					);
			}


			// delete method end here ....





		}

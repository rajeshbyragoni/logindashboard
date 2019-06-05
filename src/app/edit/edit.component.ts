import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import  {CommonService} from '../service/common.service';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

	editDataForm : FormGroup;
	id : any;

	constructor(private fb : FormBuilder, private router : Router, private route : ActivatedRoute,  private _CommonService : CommonService ) {
		this.editCreateForm();


	}


	ngOnInit() {
		
		this.route.queryParams.subscribe(params => {
			
			this.id = params['id'];
			this.getEditData(params['id']);

		});
	}


	getEditData(id){
		this._CommonService.getIdData(id).subscribe(
			result =>{
				this.editDataForm.get('company').setValue(result.employee.company);
				this.editDataForm.get('email').setValue(result.employee.email);
				this.editDataForm.get('emp_id').setValue(result.employee.emp_id);
				this.editDataForm.get('location').setValue(result.employee.location);
				this.editDataForm.get('name').setValue(result.employee.name);
				this.editDataForm.get('phone').setValue(result.employee.phone);
			}, error => {

				console.log(error.toString());
			}

			
			);

	}



	editCreateForm(){
		this.editDataForm = this.fb.group({

			company: ['', Validators.required],
			email: ['', Validators.required],
			emp_id: ['', Validators.required],
			location: ['', Validators.required],
			name: ['', Validators.required],
			phone: ['', Validators.required],
			

		});

	}

	editClick(company, email, emp_id, location, name, phone){
		this._CommonService.updateListData(company, email, emp_id, location, name, phone, this.id).subscribe(
			result => {
				console.log(result.employee);
				if(result.status){
					this.router.navigate(['/dashboard']);
				}
				//console.log(result);

			}, error => {

				console.log(error.toString());
			}


			);
	}



}

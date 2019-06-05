import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,  HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class CommonService {

	constructor(private http : HttpClient, private route: ActivatedRoute, private router: Router) { }



	// login page start here ...

	
	getLoginData(email, password):Observable<any> {

		const url = 'https://gowtham-rest-api-crud.herokuapp.com/login';
		const data = new FormData();
		data.append('email', email);
		data.append('password', password);

		return this.http.post<any>(url, data)
		.pipe(map((Response : Response) => {

			return Response;

		}),

		);
	}


	// login page end here ....

	



	// get method start here ....

	getListData():Observable<any> {
		const token = localStorage.getItem('token')
		const url ='https://gowtham-rest-api-crud.herokuapp.com/employees';
		const params = new HttpParams().set('token', token);
		return this.http.get<any>(url, {params})
		.pipe(map((Response : Response) => {
			return Response;

		}), catchError((error: Response) => {

			return throwError(error.status);

		}));
	}

	// get method end here ....



	// post method start here ....

	addListData(company, email, emp_id, location, name, phone):Observable<any> {
		const token = localStorage.getItem('token')
		const url ='https://gowtham-rest-api-crud.herokuapp.com/employees';
		const params = new HttpParams().set('token', token);
		const data = new FormData();
		data.append('company', company);
		data.append('email', email);
		data.append('emp_id', emp_id);
		// data.append('id', id);
		data.append('location', location);
		data.append('name', name);
		data.append('phone', phone);

		return this.http.post<any>(url, data, {params})
		.pipe(map((Response : Response) => {
			return Response;

		}), catchError((error: Response) => {

			return throwError(error.status);

		}));
	}

	// post method end here ....



	// update method start here ....


	/// get id/////

	getIdData(id):Observable<any> {
		const token = localStorage.getItem('token')
		const url ='https://gowtham-rest-api-crud.herokuapp.com/employees/' + id;
		const params = new HttpParams().set('token', token);
		return this.http.get<any>(url,  {params})
		.pipe(map((Response : Response) => {
			return Response;

		}), catchError((error: Response) => {

			return throwError(error.status);

		}));
	}


	/// get id/////



	///post data...

	updateListData(company, email, emp_id, location, name, phone, id):Observable<any> {

		const url ='https://gowtham-rest-api-crud.herokuapp.com/employees/' + id;
		const token = localStorage.getItem('token');
		const params = new HttpParams().set('token', token);
		// const data = new FormData();
		// data.append('company', company);
		// data.append('email', email);
		// data.append('emp_id', emp_id);
		// data.append('location', location);
		// data.append('name', name);
		// data.append('phone', phone);
		//       data.append('id', id);
		// return this.http.put<any>(url, data, {params})
		// .pipe(map((Response : Response) => {
			// 	return Response;

			// }), catchError((error: Response) => {

				// 	return throwError(error.status);

				// }));

				const data = ({ company: company, email:email, emp_id: emp_id, location: location, name:name, phone:phone, id:id, token:token });

				const headers = new Headers();
				headers.append('Content-Type', 'application/json');
				return this.http.put<any>(url, data)
				.pipe(map((Response : Response) => {
					return Response;

				}), catchError((error: Response) => {

					return throwError(error.status);

				}));
			}

			///post data...

			// update method end here ....





			// delete method start here ....

			deleteData(id):Observable<any> {

				const url ='https://gowtham-rest-api-crud.herokuapp.com/employees/' + id;
				const token = localStorage.getItem('token');
				const params = new HttpParams().set('token', token);
				return this.http.delete<any>(url, {params})
				.pipe(map((Response : Response) => {
					return Response;

				}), catchError((error: Response) => {

					return throwError(error.status);

				}));
			}


			// delete method end here ....


		}



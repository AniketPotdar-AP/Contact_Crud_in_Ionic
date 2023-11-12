import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from '../model/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  /*=======================================================
                     Create Contact
  =======================================================*/

  createContact(firstName: string, lastName: string, phoneNo: string): Observable<void> {
    const contactData: Contact = {
      firstName,
      lastName,
      phoneNo,
    };
    return this.http
      .post<void>(`${environment.apiUrl}/createContact`, contactData)
      .pipe(
        catchError((error) => {
          this.authStatusListener.next(false);
          console.error(error.error.error);
          throw error;
        })
      );
  }

  /*=======================================================
                     Get All Contact
  =======================================================*/

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${environment.apiUrl}/getContacts`);
  }

  /*=======================================================
                      Get Contact By ID
  =======================================================*/

  getContactById(id: any): Observable<Contact> {
    return this.http.get<Contact>(`${environment.apiUrl}/getContact/${id}`);
  }

  /*=======================================================
                      Update Contact
  =======================================================*/

  updateContacts(id: any, firstName: string, lastName: string, phoneNo: string) {
    const contact: Contact = {
      firstName: firstName,
      lastName: lastName,
      phoneNo: phoneNo,
    };
    return this.http
      .put(`${environment.apiUrl}/updateContact/${id}`, contact)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/home');
        },
        error: (error) => {
          console.log(error.error.error);
        },
      });
  }

  /*=======================================================
                        Delete Contact
  =======================================================*/

  deleteContact(id: any): Observable<void> {
    this.router.navigateByUrl('/home');
    return this.http
      .delete<void>(`${environment.apiUrl}/deleteContact/${id}`)
      .pipe(
        catchError((error) => {
          console.error(error.error.error);
          throw error;
        })
      );
  }
}

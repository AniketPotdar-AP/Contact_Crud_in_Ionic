import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.page.html',
  styleUrls: ['./create-contact.page.scss'],
})
export class CreateContactPage implements OnInit {
  contactForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private router: Router
  ) {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNo: ['', Validators.required],
    });
  }

  ngOnInit(): void { }

  getContacts() {
    this.contactService.getContacts().subscribe((response) => { });
  }

  /*=======================================================
                     Create Contact
  =======================================================*/

  createContact() {
    if (this.contactForm.invalid) {
      return;
    }

    const { firstName, lastName, phoneNo } = this.contactForm.value;

    this.contactService.createContact(firstName, lastName, phoneNo).subscribe(() => {
      this.router.navigateByUrl('/home');
      this.contactForm.reset();
      this.contactForm.markAsPristine();
      this.contactForm.markAsUntouched();
    });
  }

  get f() {
    return this.contactForm.controls;
  }

}

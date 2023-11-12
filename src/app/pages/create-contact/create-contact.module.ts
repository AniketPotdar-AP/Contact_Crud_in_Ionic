import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateContactPageRoutingModule } from './create-contact-routing.module';
import { CreateContactPage } from './create-contact.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateContactPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateContactPage]
})
export class CreateContactPageModule { }

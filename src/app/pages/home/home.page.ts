import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  contact: any;
  data = false;
  searchText = false;
  searchQuery: string = '';
  filteredData: any[] = [];

  performSearch() {
    this.searchText = true;
    this.filteredData = this.contact.filter(
      (item: { firstName: string; lastName: string; phoneNo: string }) =>
        item.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.lastName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.phoneNo.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    if (this.searchQuery === '') {
      this.searchText = false;
    }
  }

  constructor(
    private contactService: ContactService,
    private authService: AuthService,
    private alertController: AlertController
  ) {
    this.getContacts();
  }

  /*=======================================================
                    Get Contacts
  =======================================================*/

  getContacts() {
    this.contactService.getContacts().subscribe((response) => {
      this.contact = response;
      if (response.length != 0) {
        this.data = true;
      } else {
        this.data = false;
      }
    });
  }

  /*=======================================================
                    Delete Contact
  =======================================================*/

  deleteContact(id: any) {
    this.contactService.deleteContact(id).subscribe(() => {
      this.getContacts();
    });
  }

  logout() {
    this.authService.logout();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  async presentAlert(a: any) {
    const alert = await this.alertController.create({
      header: 'Delete Contact',
      subHeader: '',
      message: 'Are you really want to delete',
      buttons: [
        {
          text: "Delete",
          handler: () => {
            this.deleteContact(a);
          },
        }
      ],
    });
    await alert.present();
  }

  async logoutApp() {
    const alert = await this.alertController.create({
      header: 'Logout',
      subHeader: '',
      message: "Are you really want to logout",
      buttons: [
        {
          text: "Logout",
          handler: () => {
            this.logout();
          },
        }
      ],
    });

    await alert.present();
  }

  ngOnInit(): void {
    this.getContacts();
  }

}

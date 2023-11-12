import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactDetailsPage } from './contact-details.page';

describe('ContactDetailsPage', () => {
  let component: ContactDetailsPage;
  let fixture: ComponentFixture<ContactDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ContactDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

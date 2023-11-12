import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateContactPage } from './create-contact.page';

describe('CreateContactPage', () => {
  let component: CreateContactPage;
  let fixture: ComponentFixture<CreateContactPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

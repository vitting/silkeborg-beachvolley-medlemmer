import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPaymentYearDialogComponent } from './settings-payment-year-dialog.component';

describe('SettingsPaymentYearDialogComponent', () => {
  let component: SettingsPaymentYearDialogComponent;
  let fixture: ComponentFixture<SettingsPaymentYearDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsPaymentYearDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPaymentYearDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

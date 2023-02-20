import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomerFamilyComponent } from './view-customer-family.component';

describe('ViewCustomerFamilyComponent', () => {
  let component: ViewCustomerFamilyComponent;
  let fixture: ComponentFixture<ViewCustomerFamilyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCustomerFamilyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCustomerFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

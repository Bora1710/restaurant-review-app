import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewrestaurantComponent } from './newrestaurant.component';

describe('NewrestaurantComponent', () => {
  let component: NewrestaurantComponent;
  let fixture: ComponentFixture<NewrestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewrestaurantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewrestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

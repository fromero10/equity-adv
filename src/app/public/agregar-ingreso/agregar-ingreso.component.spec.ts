import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarIngresoComponent } from './agregar-ingreso.component';

describe('AgregarIngresoComponent', () => {
  let component: AgregarIngresoComponent;
  let fixture: ComponentFixture<AgregarIngresoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarIngresoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

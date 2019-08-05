import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlujoDeCajaComponent } from './flujo-de-caja.component';

describe('FlujoDeCajaComponent', () => {
  let component: FlujoDeCajaComponent;
  let fixture: ComponentFixture<FlujoDeCajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlujoDeCajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlujoDeCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

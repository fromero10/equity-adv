import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDatosComponent } from './lista-datos.component';

describe('ListaDatosComponent', () => {
  let component: ListaDatosComponent;
  let fixture: ComponentFixture<ListaDatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

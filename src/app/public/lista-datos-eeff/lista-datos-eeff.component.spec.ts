import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDatosEeffComponent } from './lista-datos-eeff.component';

describe('ListaDatosEeffComponent', () => {
  let component: ListaDatosEeffComponent;
  let fixture: ComponentFixture<ListaDatosEeffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDatosEeffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDatosEeffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

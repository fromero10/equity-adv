import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportarFlujoComponent } from './importar-flujo.component';

describe('ImportarFlujoComponent', () => {
  let component: ImportarFlujoComponent;
  let fixture: ComponentFixture<ImportarFlujoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportarFlujoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportarFlujoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

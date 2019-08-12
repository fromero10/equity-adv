import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportarCosteoComponent } from './importar-costeo.component';

describe('ImportarCosteoComponent', () => {
  let component: ImportarCosteoComponent;
  let fixture: ComponentFixture<ImportarCosteoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportarCosteoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportarCosteoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportarEeffComponent } from './importar-eeff.component';

describe('ImportarEeffComponent', () => {
  let component: ImportarEeffComponent;
  let fixture: ComponentFixture<ImportarEeffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportarEeffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportarEeffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

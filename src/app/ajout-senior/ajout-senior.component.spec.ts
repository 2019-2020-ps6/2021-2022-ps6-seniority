import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutSeniorComponent } from './ajout-senior.component';

describe('AjoutSeniorComponent', () => {
  let component: AjoutSeniorComponent;
  let fixture: ComponentFixture<AjoutSeniorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutSeniorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutSeniorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

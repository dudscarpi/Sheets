/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EsqueciASenhaComponent } from './esqueci-a-senha.component';

describe('EsqueciASenhaComponent', () => {
  let component: EsqueciASenhaComponent;
  let fixture: ComponentFixture<EsqueciASenhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsqueciASenhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsqueciASenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

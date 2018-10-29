import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaucetPage } from './faucet.page';

describe('FaucetPage', () => {
  let component: FaucetPage;
  let fixture: ComponentFixture<FaucetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaucetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaucetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniappPage } from './miniapp.page';

describe('MiniappPage', () => {
  let component: MiniappPage;
  let fixture: ComponentFixture<MiniappPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniappPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniappPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

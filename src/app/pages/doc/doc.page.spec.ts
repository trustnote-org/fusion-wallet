import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocPage } from './doc.page';

describe('DocPage', () => {
  let component: DocPage;
  let fixture: ComponentFixture<DocPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

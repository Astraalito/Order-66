import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BbEightSectionTwoComponent } from './bb-eight-section-two.component';

describe('BbEightSectionTwoComponent', () => {
  let component: BbEightSectionTwoComponent;
  let fixture: ComponentFixture<BbEightSectionTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BbEightSectionTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BbEightSectionTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

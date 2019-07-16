import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JetsonComponent } from './jetson.component';

describe('JetsonComponent', () => {
  let component: JetsonComponent;
  let fixture: ComponentFixture<JetsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JetsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JetsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

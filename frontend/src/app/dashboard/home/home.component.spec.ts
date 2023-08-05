import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponentD } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponentD;
  let fixture: ComponentFixture<HomeComponentD>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponentD]
    });
    fixture = TestBed.createComponent(HomeComponentD);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

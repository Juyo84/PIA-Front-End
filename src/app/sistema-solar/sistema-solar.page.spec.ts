import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SistemaSolarPage } from './sistema-solar.page';

describe('SistemaSolarPage', () => {
  let component: SistemaSolarPage;
  let fixture: ComponentFixture<SistemaSolarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SistemaSolarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

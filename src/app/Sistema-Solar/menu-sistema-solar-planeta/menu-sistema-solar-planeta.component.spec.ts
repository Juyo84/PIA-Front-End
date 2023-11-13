import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenuSistemaSolarPlanetaComponent } from './menu-sistema-solar-planeta.component';

describe('MenuSistemaSolarPlanetaComponent', () => {
  let component: MenuSistemaSolarPlanetaComponent;
  let fixture: ComponentFixture<MenuSistemaSolarPlanetaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSistemaSolarPlanetaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuSistemaSolarPlanetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

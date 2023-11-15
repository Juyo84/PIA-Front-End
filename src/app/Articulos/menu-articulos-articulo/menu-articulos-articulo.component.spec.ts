import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenuArticulosArticuloComponent } from './menu-articulos-articulo.component';

describe('MenuArticulosArticuloComponent', () => {
  let component: MenuArticulosArticuloComponent;
  let fixture: ComponentFixture<MenuArticulosArticuloComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuArticulosArticuloComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuArticulosArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

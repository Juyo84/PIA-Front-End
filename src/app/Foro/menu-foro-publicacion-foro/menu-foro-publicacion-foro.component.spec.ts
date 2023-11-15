import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenuForoPublicacionForoComponent } from './menu-foro-publicacion-foro.component';

describe('MenuForoPublicacionForoComponent', () => {
  let component: MenuForoPublicacionForoComponent;
  let fixture: ComponentFixture<MenuForoPublicacionForoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuForoPublicacionForoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuForoPublicacionForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TrackApiService } from '../../shared/shared';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseChartDirective } from 'ng2-charts';
import { AnalyticsHomeComponent } from './analytics-home.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';


describe('AnalyticsHomeComponent', () => {
  let component: AnalyticsHomeComponent;
  let fixture: ComponentFixture<AnalyticsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsHomeComponent ],
       imports: [ChartsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

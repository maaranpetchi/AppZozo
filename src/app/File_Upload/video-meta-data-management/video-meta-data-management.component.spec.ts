import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoMetaDataManagementComponent } from './video-meta-data-management.component';

describe('VideoMetaDataManagementComponent', () => {
  let component: VideoMetaDataManagementComponent;
  let fixture: ComponentFixture<VideoMetaDataManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoMetaDataManagementComponent]
    });
    fixture = TestBed.createComponent(VideoMetaDataManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

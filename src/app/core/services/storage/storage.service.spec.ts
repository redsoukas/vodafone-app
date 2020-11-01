import { TestBed } from '@angular/core/testing';
import { CoreModule } from '../../core.module';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ CoreModule ]
  }));

  it('should be created', () => {
    const service: StorageService = TestBed.get(StorageService);
    expect(service).toBeTruthy();
  });
});

import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from '../../core.module';

import { UsersService } from './users.service';

describe('UsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ CoreModule, SharedModule ]
  }));

  it('should be created', () => {
    const service: UsersService = TestBed.get(UsersService);
    expect(service).toBeTruthy();
  });
});

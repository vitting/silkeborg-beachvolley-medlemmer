import { TestBed } from '@angular/core/testing';

import { AdminUserInfoResolverService } from './admin-user-info-resolver.service';

describe('AdminUserInfoResolverService', () => {
  let service: AdminUserInfoResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminUserInfoResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SecurityRolesService } from './security-roles.service';

describe('SecurityRolesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecurityRolesService = TestBed.get(SecurityRolesService);
    expect(service).toBeTruthy();
  });
});

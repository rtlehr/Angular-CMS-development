import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private userPermissions: string[] = [];

  constructor() {}

  setUserPermissions(permissions: string[]): void {
    this.userPermissions = permissions;
  }

  hasPermission(permission: string): boolean {
    return this.userPermissions.includes(permission);
  }
}

import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      if (typeof window !== 'undefined' && window.localStorage) {

      const token = localStorage.getItem('token');
      return !!token;
    }}
    return false; // Prevents SSR errors
  }
}
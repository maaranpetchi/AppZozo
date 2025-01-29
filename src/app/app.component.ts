import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  isAuthenticated: boolean = false;
  ngOnInit(): void {
console.log("Oniy");

  //   this.route.queryParams.subscribe(params => {
  //   const code = params['code'];
  //   const state = params['state'];

  //   if (code && state) {
  //     // Store in localStorage
  //     localStorage.setItem('authCode', code);
  //     localStorage.setItem('authState', state);
      
  //     // Clean URL and redirect
  //     window.history.replaceState({}, document.title, '/file-upload');
  //     this.router.navigate(['/file-upload'], { replaceUrl: true });
  //   }
  // });

  // // Then check auth status
  // this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated }) => {
  //   this.isAuthenticated = isAuthenticated;
    
  //   if (isAuthenticated && !this.router.url.includes('file-upload')) {
  //     this.router.navigate(['/file-upload']);
  //   }
  // });
}

  login(): void {
    this.oidcSecurityService.authorize();
  }

  logout(): void {
    if (window.sessionStorage) {
      window.sessionStorage.clear();
    }
    window.location.href =
      'https://<user pool domain>/logout?client_id=e993lt0qvmv97mm98snt8b42a&logout_uri=<logout uri>';
  }
}

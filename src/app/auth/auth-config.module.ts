// import { NgModule } from '@angular/core';
// import { AuthModule } from 'angular-auth-oidc-client';

// // auth-config.module.ts
// @NgModule({
//     imports: [
//       AuthModule.forRoot({
//         config: {
//           authority: 'https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_gJyOPpDgP',
//           redirectUrl: 'https://localhost:4200',
//           clientId: '3hkodc8mal3rfd10re3o9vmk1t',
//           scope: 'email openid phone',
//           responseType: 'code',
//           silentRenew: true,
//           useRefreshToken: true,
//           postLogoutRedirectUri: 'https://localhost:4200',
//           forbiddenRoute: '/forbidden',
//           unauthorizedRoute: '/unauthorized',
//           secureRoutes: ['https://localhost:4200/'], // Add this
//           ignoreNonceAfterRefresh: true, // Add this
//           startCheckSession: true // Add this
          
//         },
//       }),
//     ],
//     exports: [AuthModule],
// })
// export class AuthConfigModule { }

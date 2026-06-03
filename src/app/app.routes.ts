import { Routes } from '@angular/router';

import { Authentication } from './Auth/authentication/authentication';
import { Registry } from './Auth/authentication/registry/registry';
import { Login } from './Auth/authentication/login/login';
import { Layout } from './layout/layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { authGuard } from './core/guard/auth-guard-guard';
import { Devices } from './pages/devices/devices';
import { Users } from './pages/users/users';
import { adminGuard } from './core/guard/admin-guard';
import { redirectFromLoginGuard } from './core/guard/redirect-from-login-guard';
import { Device } from './pages/devices/device/device';
import { Component } from '@angular/core';
import { Upload } from './pages/upload/upload';
export const routes: Routes = [
  {
    path: '',
    component: Authentication,
    children: [
      {
        path: 'login',
        component: Login,
        // canActivate: [redirectFromLoginGuard],
      },
      { path: 'registry', component: Registry },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  {
    path: 'layout',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: Dashboard },
      {
        path: 'devices',
        component: Devices,
        children: [
          {
            path: ':id',
            loadComponent: () =>
              import('./pages/devices/device/device').then((m) => m.Device),
          },
        ],
      },
      { path: 'users', component: Users, canActivate: [adminGuard] },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: 'upload', component: Upload },
];

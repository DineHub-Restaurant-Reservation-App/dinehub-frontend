//https://medium.com/ngconf/functional-candeactivate-guards-in-angular-2211f5da78c2

import { CanDeactivateFn, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export type CanDeactivateType =
  | boolean
  | UrlTree
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>;

export interface CanComponentDeactivate {
  canDeactivate: () => CanDeactivateType;
}

export const canDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component: CanComponentDeactivate
) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};

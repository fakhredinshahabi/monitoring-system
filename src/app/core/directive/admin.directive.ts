import {
  Directive,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Tokenservice } from '../services/tokenservice/tokenservice';

@Directive({
  selector: '[appHasRole]', // نام دایرکتیو در HTML
  standalone: true,
})
export class HasRoleDirective {
  private vcr = inject(ViewContainerRef);
  private tpl = inject(TemplateRef<any>);
  private tokenSvc = inject(Tokenservice);

  // ✅ استفاده از Setter به جای کانستراکتور
  @Input('appHasRole')
  set role(requiredRole: string) {
    const payload = this.tokenSvc.getPayload();
    if (payload?.role === requiredRole) {
      this.vcr.createEmbeddedView(this.tpl);
    } else {
      this.vcr.clear();
    }
  }
}

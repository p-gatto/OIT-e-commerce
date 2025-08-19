import { booleanAttribute, Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';

import { Store } from '@ngrx/store';

import { selectIsLogged } from './store/auth.feature';

@Directive({
  selector: '[appIfLogged]'
})
export class IfLoggedDirective {

  // when true is passed by the parent, the directive work in reverse
  hideIfLogged = input(false, { transform: booleanAttribute, alias: 'appIfLogged' });

  store = inject(Store);
  view = inject(ViewContainerRef);
  tpl = inject(TemplateRef);

  isLogged = this.store.selectSignal(selectIsLogged);

  constructor() {
    effect(() => {
      this.view.clear()

      // if logged and hideIfLogged is false
      // Render elements when user is logged
      // this is the default behavior.
      if (this.isLogged() && !this.hideIfLogged()) {
        this.view.createEmbeddedView(this.tpl)
      }

      // if not logged and hideIfLogged is true
      // I.e. render element when user is logged out
      // this is the reverse mode
      if (!this.isLogged() && this.hideIfLogged()) {
        this.view.createEmbeddedView(this.tpl)
      }
    });
  }

}
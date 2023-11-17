import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]',
})
export class UnlessDirective {
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      //* to remove everything from this place in the DOM
      this.vcRef.clear();
    }
  }

  constructor(
    //* gave accessed to the template was on
    private templateRef: TemplateRef<any>,
    //* where should be render it
    private vcRef: ViewContainerRef //* so, the template is 'what' and the container is the 'where'
  ) {}
}

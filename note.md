# ANGULAR - CLI // CHEATSHEET

Minimum use node version 16^ and Latest npm version.

- Install the Angular CLI globally:
  `npm install -g @angular/cli`

- Create Workspace:
  `ng new project name`

- Add Bootstrap css:
  `npm i –save bootstrap` Add directory to `node_modules/bootstrap/dist/css/bootstrap.min.css in angular.json`

- Run the application:
  `cd project name`
  `ng serve`

- To generate new component
  `ng generate component namecomponent` or `ng g c namecomponent`

- to generate component as a sub component
  `ng g c parentFolder/namecomponent`
  Example: `ng g c recipes/recipe-list`

- to not create a test files
  `ng g c namecomponent –skip-tests`

# ONE WAY DATA BINDING:

`(input)="onUpdateServerName($event)"`

# TWO WAY DATA BINDING:

`[(ngModel)]="serverName"`

# DIRECTIVES ATTRIBUTE

## ngClass

For dynamic add class on element based on condition.

`[ngClass]="{ nameClass: expression }"`

Example:

`[ngClass]="{ odd: numbers % 2 !== 0 }"`

## ngStyle

For dynamic styling.

`[ngStyle]="{ backgroundColor: 'red' }"`

Or can using conditional too, example:

`[ngStyle]="{backgroundColor: odd: even % 2 !== 0 ? 'red' : 'green'}"`

## Create custom attribute directive:

To generate new directive `ng generate directive namedirective` or `ng g d namedirective`

Example:

`ng g d basic-highlight`

```ts
// basic-highlight.directive.ts

import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
  selector: "[appBasicHighlight]",
})
export class basicHighlightDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    //overide element DOM styling
    this.elementRef.nativeElement.style.backgroundColor = "green";
    this.elementRef.nativeElement.style.color = "white";
  }
}
```

In `app.module.ts`: add the directive to **declarations**

```ts
// app.module.ts

import { basicHighlightDirective } from ".../basic-highlight.directive";

@NgModule({
  declarations: [basicHighlightDirective],
})
export class AppModule {}
```

This is how to use it:

```js
<p appBasicHighlight>test custom directives</p>
```

Custom directive seperti basic-highlight cara kerjanya adalah mencoba untuk mengubah styling dari DOM. dalam beberapa kasus, itu bisa saja error (contoh: jika halamannya tidak terbuka di browser).

Ada yang lebih **‘best practice’** dibandingkan dengan mengubah langsung DOM-nya, yaitu menggunakan `Renderer` untuk melakukan manipulasi DOM. Dibawah ini contohnya:

```ts
import { Directive, ElementRef, OnInit, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appBetterHighlight]",
})
export class BetterHighlightDirective implements OnInit {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.setStyle(this.elRef.nativeElement, "background-color", "salmon");
  }
}
```

# Using @HostListener()

To listen to host events. In below example: is to change style while mouse over or leave.

```ts

ngOngInit() {}

@HostListener('mouseenter') mouseover(eventData: Event) {
  this.renderer.setStyle(
    this.elRef.nativeElement,
    'background-color',
    'salmon'
  );
}


@HostListener('mouseleave') mouseleave(eventData: Event) {
  this.renderer.setStyle(
    this.elRef.nativeElement,
    'background-color',
    'transparent'
  );
}
```

## Custom Directive with @HostBinding()

To bind to host properties.

```ts
@HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';


@HostListener('mouseenter') mouseover(eventData: Event) {
  this.backgroundColor = 'red';
}


@HostListener('mouseleave') mouseleave(eventData: Event) {
  this.backgroundColor = 'transparent';
}
```


## With aliases


```ts
import {
 Directive,
 ElementRef,
 HostBinding,
 HostListener,
 Input,
 OnInit,
 Renderer2,
} from '@angular/core';


@Directive({
  selector: '[appBetterHighlight]',
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = 'transparent';
  @Input('appBetterHighlight') highlightColor: string = 'blue';


  @HostBinding('style.backgroundColor') backgroundColor: string =
    this.defaultColor;


  constructor(private elRef: ElementRef, private renderer: Renderer2) {}


  ngOnInit(): void {
    this.backgroundColor = this.defaultColor;
  }


  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.backgroundColor = this.highlightColor;
  }


  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.backgroundColor = this.defaultColor;
  }
}
```


And in the HTML file:

```ts
<p [appBetterHighlight]="'red'" [defaultColor]="'yellow'">style me with custom better directives</p>
```



# Custom property binding


```ts
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
```

And can used it like this:

```ts
<div *appUnless="onlyOdd">
    <li
    class="list-group-item"
    [ngClass]="{ odd: even % 2 !== 0 }"
    *ngFor="let even of evenNumbers"
    >
        {{ even }}
    </li>
</div>
```

# BINDING PROPS FROM PARENT TO CHILD


`@Input()` decorator is to make the element properties can handled or accessed (bind) by parent element. or `@Input(‘aliasname’)` to bind the properties using alias name

Example:

`@Input() element: {type: string, name:string, content: string}`
Or
`@Input(‘srvElement’) element: {type: string, name:string, content: string}`



Child component: shopping-edit:
```ts

// shopping-edit.component.ts

@Input('selected') selectedList;
```

html file:
```js

// shopping-edit.component.html

[disabled]="!selectedList"
```

Parent component: shopping-list:
```ts

// shopping-list.component.ts

selectedItem: any;


onClickItem(ingredient: Ingredient) {
   this.selectedItem = ingredient; // Set the clicked ingredient
}
```

.Html file

```ts 
// shopping-list.component.html
<app-shopping-edit
  [selected]="selectedItem"
></app-shopping-edit>

<a 
  (click)="onClickItem(ingredient)"
/>
```


> NOTE: `Input` is imported from `@angular/core`



# BINDING PROPERTIES OR EVENT FROM CHILD TO PARENT

`@Output()` decorator is to make the element properties or event from child component can sended to parent component.

Example:

Child component:
`app-list:`
```ts

// app-list.component.ts

@Output() blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();

onAddBlueprint() {
	this.blueprintCreated.emit({
		serverName: “test name”,
		serverContent: “test content”
	});
}
```

Parent component:
`app component:`
Html file

```ts 

// app.component.html

<app-list (blueprintCreated)=”onBlueprintAdded($event)”></app-list>

.ts file
onBlueprintAdded(blueprintData: {serverName: string, serverContent: string}) {
	this.serverElement.push({
		type: ‘blueprint’,
		name: ‘name server’,
		content: ‘content name’
	})
}
```

> NOTE: `EventEmitter` and `Output` is imported from `@angular/core`


# VIEW ENCAPSULATION

```ts 
@Component({
selector: 'app-recipe-list',
templateUrl: './recipe-list.component.html',
styleUrls: ['./recipe-list.component.css'],
encapsulation: ViewEncapsulation.None
})
```


The default is `ViewEncaptulation.Emulated` (which is generated a properties to the element) and just affected to the specific element like: 
```js
<p [ng-content-3]>Text</p>
```

Add `ViewEncapsulation.None` to make the styles in css affect to another component.
like :

```js
<p>Text<p>
```


# LOCAL REFERENCES:
Passing reference (get value) when call the method.
Alternative to not use one way or two way data binding.
Or if you dont want to add some variable.
Typescript cannot get the access (only can on html template), and send it using method/function.

.html
```html
<input type="text" #localRef />
<button (click)="onAddServer(localRef)"></button>
```

.ts
```ts
onAddServer(inputRef: HTMLInputElement) {
console.log(inputRef.value);
}
```

`inputProps` is just a name, u can give the name freely



# @ViewChild
Get references / get value before call the method.
Typescript can get the access.

```html
<input type="text" #serverContentInput />
```

.ts
```ts
@ViewChild('serverContentInput', { static: true }) serverContentInput: ElementRef;

onAddBlueprint() {
  console.log(this.serverContentInput.nativeElement.value);
}
```

The same change (add `{ static: true }` as a second argument) needs to be applied to ALL usages of `@ViewChild()` (and also `@ContentChild()`(for getting access to the content in ng-content)  which you'll learn about later) IF you plan on accessing the selected element inside of `ngOnInit()`.
If you DON'T access the selected element in `ngOnInit` (but anywhere else in your component), set `static: false` instead!
If you're using Angular 9+, you only need to add `{ static: true }` (if needed) but not `{ static: false }`.

# NG-CONTENT

By default, the content between opening and closing tag of template is removed from the DOM by angular. 

Example: 
```html
<app-server>
  <p>Text</p>
</app-server>
```

The p element will not rendered.

But there is special directive to render the content between opening and closing tag. Name is ng-content.

Example: 
```html
<ng-content></ng-content>
```

This will render the content from the template who applied the `<app-server>`


# LIFECYCLE HOOKS


| Hooks | Description |
| --- | --- |
| `ngOnChanges` | Called after a bound input property changes |
| `ngOnInit` | Called once the component is initialized |
| `ngDoCheck` | Called during every change detection run |
| `ngAfterContentInit` | Called after content (ng-content) has been projected into view |
| `ngAfterContentChecked` | Called every time the projected content has been checked |
| `ngAfterViewInit` | Called after the component’s view (and child views) has been initialized |
| `ngAfterViewChecked` | Called every time the view (and child views) have been checked |
| `ngOnDestroy` | Called once the component is about to be destroyed |




# USING FORM MODULE (input form)

Html file:
```html
<form #itemForm="ngForm" (ngSubmit)="onAddItem(itemForm)">
   <input type="text" id="name" name="itemName" ngModel />
   <button type="submit" [disabled]="itemForm.invalid">Add</button>
</form>
```

Ts file:
```ts
import { NgForm } from '@angular/forms';

onAddItem(form: NgForm) {
  const itemName = form?.value?.itemName;
  console.log(itemName);
  form.resetForm(); // Reset the form after successful submission
}
```

# USING `ngSwitch`
To render element using switch case.

```html
<div [ngSwitch]="value">
  <p *ngSwitchCase="5">value is 5</p>
  <p *ngSwitchCase="10">value is 10</p>
  <p *ngSwitchCase="100">value is 100</p>
  <p *ngSwitchDefault>default</p>
</div>
```

# USING SERVICE
Create service file, or you can generate using angular CLI with `ng g service serviceName`

Example:
```ts
export class LoggingService {
 logStatusChange(status: any) {
   console.log(status);
 }
}
```

And using in the component like this:

```ts
import { Component, OnInit,} from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';


@Component({
   selector: 'app-shopping-list',
   templateUrl: './shopping-list.component.html',
   styleUrls: ['./shopping-list.component.scss'],
   providers: [LoggingService, AccountsService], // don’t forget add this line to tell Angular to create LoggingService Instance.
})
export class ShoppingListComponent implements OnInit {
   constructor(private loggingService: LoggingService, private accountsService: AccountsService) {}

   onClickItem(ingredient: Ingredient) {
    this.selectedItem = ingredient
    this.accountsService.add(ingredient);
    this.loggingService.logStatusChange(ingredient); // here to used it
   }
}
```

> Note: 
In Angular, dependency injector actually is a **hierarchical Injector**. It means, that if we provide of a **services** in some place of our app, let’s say on one component, the Angular how to create an instance of this services for this component, and all its child components. And actually, this components and all its child component, and the child of the child components (grandchild), will receive the same instance of this services too. so , **if the parent has create an instance, you dont have to create the instance again in the child component**.
The top level possible is in `app module`.

```ts
import { Component, OnInit,} from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
   selector: 'app-shopping-list',
   templateUrl: './shopping-list.component.html',
   styleUrls: ['./shopping-list.component.scss'],
   providers: [LoggingService], // remove the account service, cause it has provided by the parent
})
export class ShoppingListComponent implements OnInit {
   constructor(private loggingService: LoggingService, private accountsService: AccountsService) {}

   onClickItem(ingredient: Ingredient) {
    this.selectedItem = ingredient
    this.accountsService.add(ingredient);
    this.loggingService.logStatusChange(ingredient); // here to used it
   }
}
```

### Alternative Injection syntax

Injecting `services` (or, in general: `dependencies`) into components via the constructor functions is the most common way of perform such injections. You'll see this approach in most Angular projects you'll be working on.
However, there also is an alternative way of injecting dependencies: Via Angular's `inject()` function.
Instead of injecting LoggingService like this:
```ts
@Component(...)
export class AccountComponent {
 // @Input() & @Output() code as shown in the previous lecture
 
 constructor(private loggingService: LoggingService) {}
}
```

you could inject it like this, by using the `inject()` function:
```ts
import { Component, Input, Output, inject } from '@angular/core'; // <- Add inject import
 
@Component(...)
export class AccountComponent {
 // @Input() & @Output() code as shown in the previous lecture
 private loggingService?: LoggingService; // <- must be added
 
 constructor() {
   this.loggingService = inject(LoggingService);
 }
}
```

It's totally up to you, which approach you prefer. In this course (and, as mentioned, in most projects), we'll use the constructor approach.

## Injecting Service Into Services
You can also injecting service into services.
Add `@Injectable()` and constructor like the example below. 

```ts
import { Injectable } from '@angular/core';
import { Ingredient } from './shared/ingredient.model';
import { LoggingService } from './logging.service';


@Injectable({
 providedIn: 'root',
})
export class IngredientService {
 ingredients: Ingredient[] = [
   new Ingredient('Apples', 5),
 ];
 constructor(private loggingService: LoggingService) {}
 add(ingredient: Ingredient) {
   this.ingredients.push(ingredient);
   this.loggingService.logStatusChange(ingredient);
 }
}
```

## Using services for cross component communication.
You can communicate between component using service with `EventEmitter`.
You can trigger on one component (**shopping-list**), and listen on another component (**shopping-edit**).
Much simpler than using event property binding like: `(statusUpdate)=”onUpdateStatus($event)”`


Example.
In ingredientService file:
```ts
// ingredient.service.ts

statusUpdated = new EventEmitter<string>();
```

In the shopping-list component:
```ts
// shopping-list.component.ts

onUpdateStatus(id: number, status: string) {
   this.ingredientService.statusUpdated.emit(status); // emit the status
   this.ingredientService.updateStatus(id, status);
 }
```

And you can subscribe in the **shopping-edit** component, and in **any other component**:
```ts
constructor(private ingredientService: IngredientService) {
 this.ingredientService.statusUpdated.subscribe((status: string) =>
     alert('new status: ' + status)
   );
 }
```


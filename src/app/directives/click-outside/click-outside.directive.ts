import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  @Output()
  clickedOutside: EventEmitter<void> = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('window:click', ['$event.target'])
  public onWindowClicked(targetElement: string): void {
    if (!this.elementRef.nativeElement.contains(targetElement)) {
      this.clickedOutside.emit(null);
    }
  }

}

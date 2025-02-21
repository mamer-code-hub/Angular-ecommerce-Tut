import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Directive({
  selector: '[appInput]'
})
export class InvalidInputDirective {
  @Input() control!:AbstractControl
  constructor(private el:ElementRef) { }


  @HostListener('blur') onBlur(){
    if(this.control.invalid){
      this.el.nativeElement.classList.add('invalid-input');
    }
  }
  ngAfterViewInit() {
    console.log(this.control);
    this.control.valueChanges.subscribe({
      next: (value) => {
        if(this.control.errors && (this.control.touched||this.control.dirty)){
          this.el.nativeElement.classList.add('invalid-input');
          this.el.nativeElement.classList.remove('valid-input');
        }else {
          this.el.nativeElement.classList.add('valid-input');
          this.el.nativeElement.classList.remove('invalid-input');
        }
      }
    })

  }

}

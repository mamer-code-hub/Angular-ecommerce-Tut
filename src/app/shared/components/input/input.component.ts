import { Component, Input } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {

  // @Input({required:true}) class!:string;
  @Input({required:true}) placeholder!:string;
  @Input({required:true}) formCName!:string;
  @Input({required:true}) type!:string;
  @Input({required:true}) formGroup!:AbstractControl;

}

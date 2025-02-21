import { Component, Input } from '@angular/core';
import { Ibrand } from '../../models/ibrand';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brand-card',
  imports: [RouterLink],
  templateUrl: './brand-card.component.html',
  styleUrl: './brand-card.component.css'
})
export class BrandCardComponent {
  @Input() brand: Ibrand={} as Ibrand;
}

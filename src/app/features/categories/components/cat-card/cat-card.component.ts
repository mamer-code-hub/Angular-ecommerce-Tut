import { Component, Input } from '@angular/core';
import { Category } from '../../models/category';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cat-card',
  imports: [RouterLink],
  templateUrl: './cat-card.component.html',
  styleUrl: './cat-card.component.css'
})
export class CatCardComponent {
  @Input() cat: Category = {} as Category;

}

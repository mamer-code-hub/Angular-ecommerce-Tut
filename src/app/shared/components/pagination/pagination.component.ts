import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  currentPage: number = 1;
  @Output() currentPageChange:EventEmitter<number> = new EventEmitter();
  @Input() totalPages!: number;


  getPageNums(): number[] {
    let PagesArray: number[] = [];
    for (let i = 0; i < this.totalPages; i++) {
      PagesArray.push(i + 1)
    }
    return PagesArray;
  }

  getNextPage() {
    if (this.currentPage < this.totalPages) {

      this.currentPage += 1;
      this.currentPageChange.emit(this.currentPage);
    }
  }
  getPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.currentPageChange.emit(this.currentPage);



    }
  }
  getSelectedPage(e: MouseEvent) {
    const t = e.target as HTMLElement;
    this.currentPage = +t.innerHTML;
    this.currentPageChange.emit(this.currentPage);




  }






}

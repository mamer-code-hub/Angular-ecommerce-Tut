import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(NgxSpinnerService)
  // if (req.url.includes('cart') || req.url.includes('orders')) {
    loading.show("spin1")
  // }

  return next(req).pipe(finalize(()=>{
    loading.hide("spin1")
  }));
};

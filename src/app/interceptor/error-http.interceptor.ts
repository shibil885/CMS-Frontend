import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastService } from '../shared/services/toast/toast.service';
import { Router } from '@angular/router';

export const httpInterceptorFn: HttpInterceptorFn = (req, next) => {
  const toaster = inject(ToastService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if (error.error.statusCode === 401) {
        router.navigate(['/auth']);
        localStorage.removeItem('acc_T');
      }

      let errorMessage = 'An unexpected error occurred.';
      if (error.error) {
        if (typeof error.error === 'string') {
          errorMessage = error.error;
        } else if (error.error.message?.message) {
          errorMessage =
            typeof error.error.message.message === 'string'
              ? error.error.message.message
              : error.error.message[0];
        }
      }
      toaster.showToast(errorMessage, 'error');
      return throwError(() => new Error(errorMessage));
    })
  );
};

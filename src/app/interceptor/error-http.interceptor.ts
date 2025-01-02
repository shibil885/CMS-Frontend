import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const httpErrorInterceptorFn: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error) => {
      let errorMessage = 'An unexpected error occurred.';
      console.log('intercepto ->', error);
      if (error.error) {
        // Handle errors based on the backend response structure
        if (typeof error.error === 'string') {
          errorMessage = error.error;
        } else if (error.error.message) {
          errorMessage =
            typeof error.error.message === 'string'
              ? error.error.message
              : error.error.message[0]; // Assume the first message in the array
        }
      }

      // Log the error to the console (optional)
      console.error(`HTTP Error: ${error.status} - ${errorMessage}`, error);

      // Show a user-friendly message
      snackBar.open(errorMessage, 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar'],
      });

      // Rethrow the error for further processing if needed
      return throwError(() => new Error(errorMessage));
    })
  );
};

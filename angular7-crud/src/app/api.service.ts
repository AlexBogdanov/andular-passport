import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Product } from './product';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-type': 'application/json' })
};
const apiUrl = 'http://localhost:3000/api/v1/products';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    }
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(apiUrl)
      .pipe(
        tap(products => console.log('Fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }

  getProduct(id: number): Observable<Product> {
    const url = `${apiUrl}/${id}`;
    return this.httpClient.get<Product>(url)
      .pipe(
        tap(_ => console.log(`Fetched product id=${id}`)),
        catchError(this.handleError<Product>(`getProduct id=${id}`))
      );
  }

  addProduct(product): Observable<Product> {
    return this.httpClient.post<Product>(apiUrl, product, httpOptions)
      .pipe(
        tap((product: Product) => console.log(`Added product with id=${product._id}`)),
        catchError(this.handleError<Product>('addProduct'))
      );
  }

  updateProduct(id, product): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.httpClient.put(url, product, httpOptions)
      .pipe(
        tap(_ => console.log(`Updated product with id=${id}`)),
        catchError(this.handleError<any>('updateProduct'))
      );
  }

  deleteProduct(id): Observable<Product> {
    const url = `${apiUrl}/${id}`;
    return this.httpClient.delete<Product>(url, httpOptions)
      .pipe(
        tap(_ => console.log(`Deleted product with id=${id}`)),
        catchError(this.handleError<Product>('deletedProduct'))
      );
  }
}

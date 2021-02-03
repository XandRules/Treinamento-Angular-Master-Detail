
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from "rxjs";
import { map, catchError, mergeMap } from "rxjs/operators";

import { Category } from "./category.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiPath: string = "api/categories"

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Category[]>{
    return this.httpClient.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategories)
    )
  }

  getById(id: number): Observable<Category>{
    const url = `${this.apiPath}/${id}`;

    return this.httpClient.get<Category>(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    );
  }

  create(category: Category): Observable<Category>{
    return this.httpClient.post(this.apiPath, category).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    )
  }

  update(category: Category): Observable<Category>{

    const url = `${this.apiPath}/${category.id}`;

    return this.httpClient.put(url, category).pipe(
      catchError(this.handleError),
      map(() => category)
    )
  }

  delete(id: number): Observable<any>{

    const url = `${this.apiPath}/${id}`;

    return this.httpClient.delete(url).pipe(
      catchError(this.handleError),
      map(() => 'Categoria excluida com sucesso')
    )
  }

  private jsonDataToCategories(jsonData: any[]): Category[]{
    const categories: Category[] = [];

    jsonData.forEach(element => categories.push(element as Category));

    return categories;
  }

  private jsonDataToCategory(jsonData: any[]): Category{
    return jsonData as Category;
  }

  private handleError(error: any): Observable<any>{
    console.log("Erro na requisição => ", error);

    return throwError(error);
  }
}

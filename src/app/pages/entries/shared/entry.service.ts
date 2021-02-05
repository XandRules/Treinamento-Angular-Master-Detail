import { CategoryService } from './../../categories/shared/category.service';
import { Entry } from './entry.model';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from "rxjs";
import { map, catchError, mergeMap, flatMap } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath: string = "api/entries"

  constructor(private httpClient: HttpClient,
    private categoryService: CategoryService) { }

  getAll(): Observable<Entry[]>{
    return this.httpClient.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntries)
    )
  }

  getById(id: number): Observable<Entry>{
    const url = `${this.apiPath}/${id}`;

    return this.httpClient.get<Entry>(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    );
  }

  create(entry: Entry): Observable<Entry>{

    return this.categoryService.getById(entry.categoryId).pipe(mergeMap(category => {

      entry.category = category;

      return this.httpClient.post(this.apiPath, entry).pipe(
        catchError(this.handleError),
        map(this.jsonDataToEntry)
      )
    }));


  }

  update(entry: Entry): Observable<Entry>{

    return this.categoryService.getById(entry.categoryId).pipe(mergeMap(category => {
      entry.category = category;
      const url = `${this.apiPath}/${entry.id}`;

      return this.httpClient.put(url, entry).pipe(
        catchError(this.handleError),
        map(() => entry)
      )
    }))

  }

  delete(id: number): Observable<any>{

    const url = `${this.apiPath}/${id}`;

    return this.httpClient.delete(url).pipe(
      catchError(this.handleError),
      map(() => 'Categoria excluida com sucesso')
    )
  }

  private jsonDataToEntries(jsonData: any[]): Entry[]{
    const entries: Entry[] = [];

    jsonData.forEach(element => {

      const entry = Object.assign(new Entry(), element)
      entries.push(entry)

    });

    return entries;
  }

  private jsonDataToEntry(jsonData: any[]): Entry{
    return Object.assign(new Entry(), jsonData);
  }

  private handleError(error: any): Observable<any>{
    console.log("Erro na requisição => ", error);

    return throwError(error);
  }
}

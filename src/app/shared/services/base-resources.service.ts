import { BaseResourceModel } from "../models/base-resource.model";

import { HttpClient } from '@angular/common/http'

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Injector } from "@angular/core";

export abstract class BaseResouceService<T extends BaseResourceModel>{

  protected httpClient : HttpClient;

  constructor
  (
    protected apiPath: string,
    protected injector : Injector,
    protected jsonDataToResourceFn: (jsonData: any) => T
  ){
    this.httpClient = injector.get(HttpClient);
  }

  getAll(): Observable<T[]>{
    return this.httpClient.get(this.apiPath).pipe(
      map(this.jsonDataToResources.bind(this)),
      catchError(this.handleError)
    )
  }

  getById(id: number): Observable<T>{
    const url = `${this.apiPath}/${id}`;

    return this.httpClient.get<T>(url).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError),
    );
  }

  create(resource: T): Observable<T>{
    return this.httpClient.post(this.apiPath, resource).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError),
    )
  }

  update(resource: T): Observable<T>{

    const url = `${this.apiPath}/${resource.id}`;

    return this.httpClient.put(url, resource).pipe(
      catchError(this.handleError),
      map(() => resource)
    )
  }

  delete(id: number): Observable<any>{

    const url = `${this.apiPath}/${id}`;

    return this.httpClient.delete(url).pipe(
      map(() => 'Categoria excluida com sucesso'),
      catchError(this.handleError)
    )
  }

  //Protected methods

  protected jsonDataToResources(jsonData: any[]): T[]{
    const resources: T[] = [];

    jsonData.forEach(element => resources.push(this.jsonDataToResourceFn(element)));

    return resources;
  }

  protected jsonDataToResource(jsonData: any): T{
    return this.jsonDataToResourceFn(jsonData);
  }

  protected handleError(error: any): Observable<any>{
    console.log("Erro na requisição => ", error);

    return throwError(error);
  }

}

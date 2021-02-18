import { catchError } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CategoryService } from './../../categories/shared/category.service';
import { Entry } from './entry.model';

import { Injectable, Injector } from '@angular/core';
import { BaseResouceService } from 'src/app/shared/services/base-resources.service';


@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResouceService<Entry> {


  constructor
  (
    protected injector: Injector,
    protected categoryService: CategoryService
  )
  {
      super("api/entries", injector, Entry.fromJson);
  }

  create(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.create.bind(this))
  }

  update(entry: Entry): Observable<Entry>{
    return this.setCategoryAndSendToServer(entry, super.update.bind(this))
  }

  private setCategoryAndSendToServer(entry: Entry, sendFn: any): Observable<any> {
    return this.categoryService.getById(entry.categoryId).pipe(
      mergeMap(category => {
        entry.category = category;
        return sendFn(entry)
      }),
      catchError(this.handleError)
    );
  }


}

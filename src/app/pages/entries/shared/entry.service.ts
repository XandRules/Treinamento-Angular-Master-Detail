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


  constructor(protected injector: Injector, protected categoryService: CategoryService)
  {
      super("api/entries", injector);
  }

  create(entry: Entry): Observable<Entry>{

    return this.categoryService.getById(entry.categoryId).pipe(
      mergeMap(category => {

      entry.category = category;
      return super.create(entry);
      })
    );
  }

  update(entry: Entry): Observable<Entry>{

    return this.categoryService.getById(entry.categoryId).pipe(mergeMap(category => {
      entry.category = category;
      return super.update(entry);

    }))

  }

  protected jsonDataToResources(jsonData: any[]): Entry[]{
    const entries: Entry[] = [];

    jsonData.forEach(element => {

      const entry = Object.assign(new Entry(), element)
      entries.push(entry)

    });

    return entries;
  }

  protected jsonDataToResource(jsonData: any[]): Entry{
    return Object.assign(new Entry(), jsonData);
  }

}

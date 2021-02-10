import { HttpClient } from '@angular/common/http';

import { Injectable, Injector } from '@angular/core';
import { Category } from "./category.model";
import { BaseResouceService } from '../../../shared/services/base-resources.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseResouceService<Category>{

  constructor(protected injector: Injector) {
     super("api/categories", injector)
   }

}


import { OnInit } from '@angular/core';

import { BaseResouceService } from 'src/app/shared/services/base-resources.service';
import { BaseResourceModel } from '../../models/base-resource.model';

export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  resources: T[] = [];

  constructor(private resourceService: BaseResouceService<T>) { }

  ngOnInit(): void {

    this.resourceService.getAll().subscribe(resources =>{
      this.resources = resources.sort((a,b) => b.id - a.id ),
      error => alert('erro ao carregar a lista')
    })
  }

  deleteResource(resource: T){

    const mustDelete = confirm('Deseja mesmo deletar esse item?');

    if(mustDelete){

      this.resourceService.delete(resource.id).subscribe(
        () => this.resources = this.resources.filter(element =>  element != resource),
        () => alert('Erro ao tentar excluir')
      )
    }
  }

}

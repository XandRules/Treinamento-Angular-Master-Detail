import { EntryService } from './../shared/entry.service';
import { Entry } from './../shared/entry.model';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  entries: Entry[] = [];

  constructor(private entryService: EntryService) { }

  ngOnInit(): void {

    this.entryService.getAll().subscribe(entries =>{
      this.entries = entries,
      error => alert('erro ao carregar a lista')
    })
  }

  deleteEntry(entry){

    const mustDelete = confirm('Deseja mesmo deletar esse item?');

    if(mustDelete){

      this.entryService.delete(entry).subscribe(
        () => this.entries = this.entries.filter(element =>  element != entry),
        () => alert('Erro ao tentar excluir')
      )
    }
  }

}

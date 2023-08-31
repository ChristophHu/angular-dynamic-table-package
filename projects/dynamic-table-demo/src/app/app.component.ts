import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { TableSortEnum } from '@christophhu/dynamic-table/lib/models/tablesort.enum';
import { TableActionEnum } from '@christophhu/dynamic-table/lib/models/tableaction.enum';
import { TableActionReturn } from '@christophhu/dynamic-table/lib/models/tableaction.model';
import { Tableoptions } from '@christophhu/dynamic-table/lib/models/tableoptions.model';
import { Observable, delay, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  data$!: Observable<any[]>

  table: Tableoptions = {
    actions: [
      { name: 'delete', icon: 'trash', action: 1 },
      { name: 'edit', icon: 'edit', action: 2 }
    ],
    columns: [
      { id: '1', name: 'id', header: 'ID', cell: 'id', hidden: false, sortable: true },
      { id: '2', name: 'id_schiff', header: 'ID_Schiff', cell: 'id_schiff', hidden: false, sortable: true },
      { id: '3', name: 'date', header: 'Datum/Zeit', cell: 'date', pipe: { name: DatePipe, args: 'dd.MM.yyyy HH:mm'}, hidden: false, sortable: true, type: 'datetime-local' },
      { id: '4', name: 'ort', header: 'Ort', cell: 'ort', hidden: false, sortable: true },
      // { id: '3', name: 'date', header: 'Date', cell: 'date', pipe: { name: DatePipe, args: 'dd.MM.'}, hidden: false, sortable: true }
    ],
    columnFilter: ['date', 'ort'],
    columnNames: ['id', 'id_schiff', 'date', 'ort'],
    showCount: true,
    showPaginator: true,
    sortColumn: 'ort',
    sortStart: TableSortEnum.DESC
  }

  constructor() {
    const source = of([
      { id: 1, id_schiff: 1, date: '2021-01-01T00:00', ort: 'Hamburg',  },
      { id: 2, id_schiff: 2, date: '2021-01-02T00:00', ort: 'Bremen' },
      { id: 3, id_schiff: 3, date: '2021-01-03T00:00', ort: 'Kiel' },
    ])
    this.data$ = source.pipe(
      delay(1000)
    )

    if (this.table.actions) this.table.columnNames.push('actions')
    if (this.table.showCount) this.table.columnNames.unshift('count')
  }

  returnTableAction(event: TableActionReturn) {
    switch (event.action) {
      case TableActionEnum.DELETE:
        //this._dataFacade.deletePosition(event.id)
        break
      case TableActionEnum.EDIT:
        // this.data$.subscribe({
        //   next: (data) => {
        //     console.log(data)
        //     console.log(event.id)
        //     // if (data.find((item) => item.id == event.id)) this._router.navigate([event.id], { relativeTo: this._route })
        //     if (data) {
        //       const found = data.find(el => el.id == event.id)
        //       this._dynamicModalService.setModalData(found)
        //     }
        //   }
        // })
        // console.log('open')
        // this.matDrawer.open()
        this.data$.subscribe({
          next: (data) => {
            if (data) {
              const found = data.find(el => el.id == event.id)
              // this._dynamicModalService.setModalData(found)
            }
          }
        })
        // this.matDrawer.open()
        break
      default:

    }
  }
}

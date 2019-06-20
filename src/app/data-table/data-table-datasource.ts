import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSort} from '@angular/material';
import {map} from 'rxjs/operators';
import {Observable, of as observableOf, merge} from 'rxjs';

// TODO: Replace this with your own data model type
export interface DataTableItem {
  id: number;
  title: string;
  description: string;
  price: number;
  date: Date;
}

// TODO: replace this with real data from your application
// const EXAMPLE_DATA: DataTableItem[] = [
//   {id: 1, name: 'Hydrogen'},
//   {id: 2, name: 'Helium'},
//   {id: 3, name: 'Lithium'},
//   {id: 4, name: 'Beryllium'},
//   {id: 5, name: 'Boron'},
//   {id: 6, name: 'Carbon'},
//   {id: 7, name: 'Nitrogen'},
//   {id: 8, name: 'Oxygen'},
//   {id: 9, name: 'Fluorine'},
//   {id: 10, name: 'Neon'},
//   {id: 11, name: 'Sodium'},
//   {id: 12, name: 'Magnesium'},
//   {id: 13, name: 'Aluminum'},
//   {id: 14, name: 'Silicon'},
//   {id: 15, name: 'Phosphorus'},
//   {id: 16, name: 'Sulfur'},
//   {id: 17, name: 'Chlorine'},
//   {id: 18, name: 'Argon'},
//   {id: 19, name: 'Potassium'},
//   {id: 20, name: 'Calcium'},
//   {id: 10, name: 'Hydrogen'},
//   {id: 20, name: 'Helium'},
//   {id: 30, name: 'Lithium'},
//   {id: 40, name: 'Beryllium'},
//   {id: 50, name: 'Boron'},
//   {id: 60, name: 'Carbon'},
//   {id: 70, name: 'Nitrogen'},
//   {id: 80, name: 'Oxygen'},
//   {id: 90, name: 'Fluorine'},
//   {id: 100, name: 'Neon'},
//   {id: 110, name: 'Sodium'},
//   {id: 120, name: 'Magnesium'},
//   {id: 130, name: 'Aluminum'},
//   {id: 140, name: 'Silicon'},
//   {id: 150, name: 'Phosphorus'},
//   {id: 160, name: 'Sulfur'},
//   {id: 170, name: 'Chlorine'},
//   {id: 180, name: 'Argon'},
//   {id: 190, name: 'Potassium'},
//   {id: 200, name: 'Calcium'},
// ];
const EXAMPLE_DATA: DataTableItem[] = [
  {id: 1, title: 'widget1', description: 'widget1 description', price: 1231, date: new Date()
},
  {id: 2, title: 'widget2', description: 'widget2 description', price: 1232, date: new Date()
  },
  {id: 3, title: 'widget3', description: 'widget3 description', price: 1233, date: new Date()
  },
  {id: 4, title: 'widget4', description: 'widget4 description', price: 1234, date: new Date()
  }
];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<DataTableItem> {
  data: DataTableItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DataTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'title':
          return compare(a.title, b.title, isAsc);
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

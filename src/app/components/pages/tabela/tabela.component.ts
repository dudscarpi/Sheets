import { Component, OnInit, ViewChild } from '@angular/core';
import { Row } from '../model/row';
import { Sheets } from '../model/sheets';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GetService } from '../services/get-service.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit {

  pageSizeOptions: number[] = [10, 15, 20, 25];
  
  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  sheets!: Sheets;
  row!: Row[];

  colunas: string[] = ['ID', 'Product','Sku','Nome', 'Descricao','Cor', 'Tamanho','Imagem']
  dataSource: MatTableDataSource<Row> = new MatTableDataSource();

  carregando: boolean = false;

  constructor(private getService: GetService) { 
    this.dataSource = new MatTableDataSource(this.row);
  }

  ngOnInit(): void {
    this.getService.Rows$.subscribe(
      (response) => {
        if(response){
          this.getSheets();
        }
      }
    );
  }

  getSheets(): void {
    this.getService.getSheets().subscribe({
      next: (res: Sheets) => {
        this.row = res.Row;
        this.dataSource.data = this.row;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 0);
      },
      error:(err) => {
        console.log(err);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}





/* import { Component, OnInit, ViewChild } from '@angular/core';
import { Row } from '../model/row';
import { Sheets } from '../model/sheets';
import { GetService } from '../services/get-service.service';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})

export class TabelaComponent implements OnInit {

  pageSizeOptions: number[] = [10, 15, 20, 25];
  @ViewChild('paginator') paginator: any;
  @ViewChild('dataTable', {static: false}) table: any;

  sheets!: Sheets;
  row!: Row[];

  colunas: string[] = ['ID', 'Product','Sku','Nome', 'Descricao','Cor', 'Tamanho','Imagem']
  dataSource: Row[] = [];

  carregando: boolean = false;
  searchTerm!: string;

  constructor(private getService: GetService) { }

  ngOnInit(): void {
    this.getService.Rows$.subscribe(
      (response) => {
        if(response){
          this.getSheets();
        }
      }
    );
  }

  getSheets(): void {
    this.getService.getSheets().subscribe({
      next: (res: Sheets) => {
        this.row = res.Row;
        this.dataSource = this.row;
      },
      error:(err) => {
        console.log(err);
      }
    });
  }
  applyFilter(event: any) {
    const filterValue = event.target.value;
    this.table.nativeElement.querySelector('.table').DataTable().search(filterValue).draw();
  }
  search(): void {
    if (this.searchTerm === '') {
      this.dataSource = this.row;
    } else {
      this.dataSource = this.row.filter((data: Row) => {
        return Object.values(data).some((val: any) => {
          return val.toString().toLowerCase().includes(this.searchTerm.toLowerCase());
        })
      })
    }
  }
}
 */
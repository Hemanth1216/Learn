import { Component, Injector, OnInit } from '@angular/core';
import { Table } from '../../shared/Interfaces/table.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOptions } from 'ngx-bootstrap/modal';
import { UserComponent } from '../../user/user.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit{

  tableHeaders: string[] = ['Id', 'First Name', 'Last Name', 'Organization', 'Project', 'Tech Stack', 'Role', 'Pay(LPA)','Actions'];
  UsersData: Table[] = [];
  isAscending: boolean = true;

  constructor(private formBuilder: FormBuilder, private modalService: NgbModal,
    private injector: Injector, private toastrService: ToastrService
  ) {

  }

  ngOnInit() {
    this.populateTableData();
  }

  populateTableData(): Table[] {

    this.UsersData.push({
      id: '101', firstname: 'Hemanth', lastname: 'Narra', company: 'OSI Digital',
      project: 'BBSI', tech: 'Frontend Developer', role: 'ASE', salary: 7
    });
    this.UsersData.push({
      id: '102', firstname: 'Channakya', lastname: 'Narra', company: 'CTS',
      project: 'Helion', tech: 'Automation Engineer', role: 'ASE', salary: 7.5
    });
    this.UsersData.push({
      id: '103', firstname: 'Praveen', lastname: 'Netinti', company: 'Drag & Drop',
      project: 'My Bizz ERP', tech: 'Frontend Lead', role: 'SE', salary: 10
    });
    this.UsersData.push({
      id: '104', firstname: 'Karthik', lastname: 'Nallabirudu', company: 'Synopsis',
      project: 'Bench', tech: 'Devops Engineer', role: 'ASE', salary: 14
    });

    this.sort();
    return this.UsersData;
  }

  addClient() {
    const modalRef = this.modalService.open(UserComponent, {
      centered: true,
      backdrop: 'static',
      injector: Injector.create([{
        provide: ModalOptions,
        useValue: {mode : 'add'}
      }], this.injector),
      size: 'lg'
    });
    modalRef.componentInstance.mode = 'add';
    modalRef.result.then((userInfo) => {
      userInfo.clientInfo.id = '104';
      this.UsersData = [...this.UsersData, userInfo.clientInfo];
      this.toastrService.success('Client added successfully');
      this.sort();
    })
  }

  deleteClient(firstName: string) {
    this.UsersData = this.UsersData.filter(user => user.firstname !== firstName);
    this.toastrService.success('Client deleted successfully');
  }

  editClient(user: Table) {
    const modalRef = this.modalService.open(UserComponent, {
      centered: true,
      backdrop: 'static',
      injector: Injector.create([{
        provide: ModalOptions,
        useValue: {mode : 'edit', user: user}
      }], this.injector),
      size: 'lg'
    });
    modalRef.componentInstance.mode = 'edit';
    modalRef.componentInstance.selectedUser = user;
    modalRef.result.then((userInfo) => {
      user.firstname = userInfo.clientInfo.firstname;
      user.lastname = userInfo.clientInfo.lastname;
      user.company = userInfo.clientInfo.company;
      user.project = userInfo.clientInfo.project;
      user.tech = userInfo.clientInfo.tech;
      user.role = userInfo.clientInfo.role;      
      user.salary = userInfo.clientInfo.salary;
      this.toastrService.success('Client updated successfully');
      this.sort();
    });
  }

  sort() {
    this.UsersData.sort((a, b) => a.firstname.localeCompare(b.firstname));
  }

  sortOnTableHeader(tableHeader: string) {
    if(tableHeader !== 'Actions') {
      this.UsersData.sort((a: any, b: any) => {
        const valueA = a[this.mapTableHeaderTokey(tableHeader)];
        const valueB = b[this.mapTableHeaderTokey(tableHeader)];
        const sortOrder = this.isAscending ? 1 : -1;

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return sortOrder * valueA.localeCompare(valueB);
        } else if (typeof valueA === 'number' && typeof valueB === 'number') {
          return sortOrder * (valueA - valueB);
        }
    
        return 0;
      });
      this.isAscending = !this.isAscending;
    }
  }

  mapTableHeaderTokey(tableHeader: string) {
    if(tableHeader === 'First Name') return 'firstname';
    else if(tableHeader === 'Last Name') return 'lastname';
    else if(tableHeader === 'Organization') return 'company';
    else if(tableHeader === 'Project') return 'project';
    else if(tableHeader === 'Tech Stack') return 'tech';
    else if(tableHeader === 'Role') return 'role';
    else if(tableHeader === 'Pay(LPA)') return 'salary';
    else if(tableHeader === 'Id') return 'id';
    else return '';
  }

}

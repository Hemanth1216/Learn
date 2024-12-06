import { Component } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormArray, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from '../shared/Interfaces/table.interface';
import { ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  clientForm: any;
  clientInfo: Table = {
    firstname: '',
    lastname: '',
    company: '',
    project: '',
    tech: '',
    role: '',
    salary: 0
  };
  mode: string = 'view';
  selectedUser: Table = {
    firstname: '',
    lastname: '',
    company: '',
    project: '',
    tech: '',
    role: '',
    salary: 0
  };

  constructor(private formBuilder: FormBuilder, private activeModalService: NgbActiveModal,
    private inputData: ModalOptions
  ) {}

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      organization: ['', Validators.required],
      project: ['', Validators.required],
      techStack: ['', Validators.required],
      role: ['', Validators.required],
      pay: ['', Validators.required]
    });
    console.log(this.mode);
    console.log(this.selectedUser);
    if(this.mode === 'edit') {
      this.clientForm.get('firstName').setValue(this.selectedUser.firstname);
      this.clientForm.get('lastName').setValue(this.selectedUser.lastname);
      this.clientForm.get('organization').setValue(this.selectedUser.company);
      this.clientForm.get('project').setValue(this.selectedUser.project);
      this.clientForm.get('techStack').setValue(this.selectedUser.tech);
      this.clientForm.get('role').setValue(this.selectedUser.role);
      this.clientForm.get('pay').setValue(this.selectedUser.salary);
    }
  }

  onAddClientSubmit() {
    this.clientInfo.firstname = this.clientForm.get('firstName')?.value;
    this.clientInfo.lastname = this.clientForm.get('lastName')?.value;
    this.clientInfo.company = this.clientForm.get('organization')?.value;
    this.clientInfo.project = this.clientForm.get('project')?.value;
    this.clientInfo.tech = this.clientForm.get('techStack')?.value;
    this.clientInfo.role = this.clientForm.get('role')?.value;
    this.clientInfo.salary = this.clientForm.get('pay')?.value;
    this.activeModalService.close({ clientInfo : this.clientInfo});
  }

  onModalClose() {
    this.activeModalService.close();
  }
}

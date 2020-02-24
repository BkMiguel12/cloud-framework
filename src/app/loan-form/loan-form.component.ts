import { Component, OnInit, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanService } from '../services/loan.service';
import Swal from 'sweetalert2'
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.scss']
})
export class LoanFormComponent implements OnInit {

  @ViewChild('f', {static: false}) f:NgForm;

  public form: FormGroup;
  public userId: string;
  public data: any;

  public existView:boolean = false;
  public errorSpin: boolean = true;
  public loading:boolean = false;

  constructor(@Inject(LOCALE_ID) private locale: string,
              private router: Router,
              private actRouted: ActivatedRoute, 
              private loanService: LoanService) { }

  ngOnInit() {
    console.log('LOAN');
    this.initForm();
    this.actRouted.params.subscribe(params => {
      console.log(params);
      if(params && params.id) {
        this.userId = params.id;
        this.getUser(this.userId);
      } else {
        this.router.navigate(['not_found']);
      }
    })
    // this.actRouted.queryParams.pipe(
    //   filter(params => 'id' in params),
    //   map((params:any) => params.id),
    // )
    // .subscribe(params => {
    //   console.log(params);
    //   if(params) {
    //     this.userId = params;
    //     this.getUser(this.userId);
    //   } else {
    //     this.router.navigate(['not_found']);
    //   }
    // });
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      age: new FormControl(null, Validators.required),
      loan_date: new FormControl(null, Validators.required),
      loan_amount: new FormControl(null, Validators.required),
      loan_weeks: new FormControl(null, Validators.required),
    });
  }

  getUser(id:string) {
    this.loanService.getUser(id).then(res => {
      console.log(res);
      if(res['success']) {
        this.data = res['data'];
        this.form.patchValue(this.data);
        this.errorSpin = false;
      } else {
        this.router.navigate(['not_found']);
      }
    }).catch(err => {
      console.log('Error', err);
      this.errorSpin = false;
      this.router.navigate(['not_found']);
    });
  }

  reset() {
    this.f.resetForm();
  }

  onSubmit() {
    this.loading = true;
    let date = formatDate(this.form.get('loan_date').value, 'yyyy-MM-dd', this.locale);
    this.form.get('loan_date').setValue(date);

    this.loanService.sendLoan(this.form.value, this.userId).then(res => {
      console.log(res);
      if(res['success']) {
        Swal.fire('Importante', 'Su solicitud de préstamo fue realizada con éxito', 'success')
          .then(res => {
            this.form.reset();
            this.f.resetForm();
          });
      } else {
        Swal.fire('Importante', 'Ha ocurrido un error...', 'error');
        this.loading = false;
      }
    }).catch(err => {
      console.log('ERROR', err);
      Swal.fire('Importante', 'Ha ocurrido un error...', 'error');
      this.loading = false;
    });
  }

}

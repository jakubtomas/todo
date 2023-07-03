import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {
  constructor(private _formBuilder: FormBuilder) {}
  ngOnInit(): void {}

  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    age: ['', [Validators.required, Validators.max(99), Validators.min(22)]]
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required]
  });
  isLinear = false;

  get getFirstFormControl() {
    return this.firstFormGroup.controls;
  }
  reset() {
    console.log('click reset');
  }

  firstNext() {
    console.log('vypis');

    //    console.log(this.firstFormGroup);
  }

  doneStepper() {
    console.log('--------');
    console.log(this.firstFormGroup.value);
    console.log('--------');
    console.log(this.secondFormGroup.value);
    console.log(this.secondFormGroup);
    console.log('--------');
    console.log();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {
  dynamicForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.dynamicForm = this.formBuilder.group({
      numberOfTextboxs: ['', Validators.required],
      textboxs: new FormArray([]),

      numberOfDropdowns: ['', Validators.required],
      dropdowns: new FormArray([]),

      name: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  // convenience getters for easy access to form fields
  get f() {
    return this.dynamicForm.controls;
  }
  get t() {
    return this.f.textboxs as FormArray;
  }

  get d() {
    return this.f.dropdowns as FormArray;
  }

  onChangeTextbox(e) {
    const numberOfTextboxs = e.target.value || 0;
    if (this.t.length < numberOfTextboxs) {
      for (let i = this.t.length; i < numberOfTextboxs; i++) {
        this.t.push(
          this.formBuilder.group({
            name: ['', Validators.required],
          })
        );
      }
    } else {
      for (let i = this.t.length; i >= numberOfTextboxs; i--) {
        this.t.removeAt(i);
      }
    }
  }

  onChangeDropdown(e) {
    const numberOfDropdowns = e.target.value || 0;
    if (this.d.length < numberOfDropdowns) {
      for (let i = this.d.length; i < numberOfDropdowns; i++) {
        this.d.push(
          this.formBuilder.group({
            state: ['', Validators.required],
          })
        );
      }
    } else {
      for (let i = this.d.length; i >= numberOfDropdowns; i--) {
        this.d.removeAt(i);
      }
    }
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.dynamicForm.invalid) {
      return;
    }

    // display form values on success
    alert(
      'SUCCESS!! :-)\n\n' + JSON.stringify(this.dynamicForm.value, null, 4)
    );
  }

  onReset() {
    // reset whole form back to initial state
    this.submitted = false;
    this.dynamicForm.reset();
    this.t.clear();
  }

  onClear() {
    // clear errors and reset ticket fields
    this.submitted = false;
    this.t.reset();
  }
}

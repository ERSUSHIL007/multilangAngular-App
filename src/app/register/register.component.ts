import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;

  returnUrl: string;

  constructor(private fb: FormBuilder, private router: Router) { }

  error_messages = {
    'fname': [{ type: 'required', message: 'First Name is required!' }],
    'lname': [{ type: 'required', message: 'Last Name is required!' }],
    'email': [{ type: 'required', message: 'Email is required!'},
              { type: 'pattern', message: 'Please enter a valid Email Address!'}],
    'password': [{ type: 'required', message: 'Password is required!'},
                 { type: 'minlength', message: 'Password accepts minimum of 6-characters!'},
                 { type: 'maxlength', message: 'Password accepts maximum of 12-characters!'},
                 { type: 'pattern', message: 'Please enter a vaild Password!'}
                ],
    'confirm_password': [{ type: 'required', message: 'Password is required!'},
                         { type: 'minlength', message: 'Password accepts minimum of 6-characters!'},
                         { type: 'maxlength', message: 'Password accepts maximum of 12-characters!'},
                          { type: 'pattern', message: 'Please enter a vaild Password!'}
                         ]
          };

  ngOnInit() {
    this.registrationForm = this.fb.group({
      fname: new FormControl('', Validators.compose([Validators.required])),
      lname: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{6,12}')]) ),
      confirm_password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{6,12}')]) )
    }, {
      validators: this.password.bind(this)
    });
    // // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  //Match the Passwords
  password(formGroup: FormGroup) {
    const { value: password} = formGroup.get('password');
    const { value: confirm_password} = formGroup.get('confirm_password');
    return password===confirm_password ? null : { passwordNotMatch: true }; 
  }

  //  // convenience getter for easy access to form fields
  //  get f() { return this.registrationForm.controls; }

  onSubmit() {
     // stop here if form is invalid
     if (this.registrationForm.invalid) {
      return;
    }
    this.router.navigate(['/']);
        
  }
  

}

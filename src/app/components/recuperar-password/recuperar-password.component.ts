import { leadingComment } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {

  recuperarPassword:FormGroup;
  loading:boolean = false;

  constructor(private fb:FormBuilder, private afAuth:AngularFireAuth, private toastr:ToastrService, private router:Router, private fireCodeError:FirebaseCodeErrorService) {
    this.recuperarPassword = this.fb.group({email:['', Validators.required]});
  }

  recuperar(){
    const email = this.recuperarPassword.value.email;
    this.loading = true;
    this.afAuth.sendPasswordResetEmail(email).then(()=>{
      this.toastr.info('Le enviamos un correo para restablecer sus cambios', 'Restablecer Password');
      this.router.navigate(['/login']);
    }).catch((error)=>{
      this.loading = false;
      this.toastr.error(this.fireCodeError.firebaseError(error.code), 'Error');
    });
  }


  ngOnInit(): void {
  }

}

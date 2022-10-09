import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  registrarUsuario: FormGroup;
  loader: boolean = false;

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private toastr: ToastrService, private router: Router, private fireCodeError:FirebaseCodeErrorService) {
    this.registrarUsuario = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      repetirPassword: ['', Validators.required],
    })
  }

  registrar() {
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const repetirPassword = this.registrarUsuario.value.repetirPassword;

    if (password !== repetirPassword) {
      this.toastr.error('Las contraseñas ingresadas deben ser iguales', 'Error');
      return;
    }

    this.loader = true;

    this.afAuth.createUserWithEmailAndPassword(email, password).then(() => {
      this.loader = false;
      this.toastr.success('El usuario fue registrado con exito!', 'Usuario registrado');
      this.router.navigate(['/login']);
    }).catch((error) => {
      this.loader = false;
      this.toastr.error(this.fireCodeError.firebaseError(error.code), 'Error');
    });
  }

  ngOnInit(): void {
  }

}

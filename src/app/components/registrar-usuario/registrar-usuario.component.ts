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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
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
      this.verificarCorreo();
    }).catch((error) => {
      this.loader = false;
      this.toastr.error(this.fireCodeError.firebaseError(error.code), 'Error');
    });
  }

  verificarCorreo(){
    this.afAuth.currentUser
    .then((user)=>user?.sendEmailVerification())
    .then(()=>{
      this.toastr.info('Le enviamos un correo electronico para su verificacion', 'Verificar Correo');
      this.router.navigate(['/login']);
    });
  }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-verificar-correo',
  templateUrl: './verificar-correo.component.html',
  styleUrls: ['./verificar-correo.component.css']
})

export class VerificarCorreoComponent implements OnInit {

  userData:any;

  constructor(private afAuth:AngularFireAuth) { }
  
  ngOnInit(): void {
    this.afAuth.currentUser.then((user)=>{
      if(user)
        this.userData = user;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userData: any;

  constructor(private router:Router, private afAuth:AngularFireAuth) {
  this.afAuth.authState.subscribe((user)=>{
    if(user && user.emailVerified)
      this.userData = user;
    else
      this.router.navigate(['/login']);
    });
  }

  logIn(){
    this.afAuth.setPersistence('session').then(()=>{
      this.afAuth.signInWithEmailAndPassword(this.userData.email, this.userData.password)
      .then((userCredential)=>{
        this.userData = userCredential;
      });
    });
  }

  logOut(){
    this.afAuth.signOut().then(()=>{
      this.router.navigate(['/login']);
    });
  }

  ngOnInit(): void {
  }

}

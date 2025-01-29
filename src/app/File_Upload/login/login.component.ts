import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
constructor(private route:Router){}
  username: string = ''; // Bind username input
  password: string = ''; // Bind password input
  isPasswordVisible: boolean = false;

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  onLogin() {
    if (this.username === 'admin' && this.password === 'admin') {
      // Navigate to file upload page
      this.route.navigate(['/file-upload']);
    } else {
      // Display alert if credentials are incorrect
Swal.fire(`info','User doesn't exist`,'info').then((res)=>{
  if(res.isConfirmed){
    this.username=''
    this.password='';
  }
})
    }
  }


}

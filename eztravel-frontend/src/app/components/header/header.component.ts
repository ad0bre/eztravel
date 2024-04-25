import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../services/user.service';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  userRole: number;

  constructor(private router: Router, private userService: UserService, private userProfileService: UserProfileService) { 
    this.userRole = 0;
    this.findUserProfile(localStorage.getItem('username') || '');
  }

  faUser = faUser;

  async findUserProfile(username: string): Promise<void> {
    try {
      const users = await this.userService.getUsers().toPromise();
      if (users) {
        const foundUser = users.find(user => user.userName === username);
        if (foundUser) {
          const userID = foundUser.id;
          const userProfiles = await this.userProfileService.getUserProfiles().toPromise();
          if (userProfiles) {
            const foundUserProfile = userProfiles.find(userProfile => userProfile.userId === userID);
            if (foundUserProfile) {
              this.userRole = foundUserProfile.type;
            } else {
              console.log('User profile not found!');
            }
            localStorage.setItem('userID', foundUser.id);
          } else {
            console.log('User profiles not found!');
          }
        } else {
          console.log("User not found");
        }
      } else {
        console.log('Users not found!');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async goToHome(){
    await this.findUserProfile(localStorage.getItem('username') || '');
    if(this.userRole == 0){
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['vendor-home']);
    }
  }
  async goToProfile(){
    await this.findUserProfile(localStorage.getItem('username') || '');
    if(this.userRole == 0){
      this.router.navigate(['profile']);
    } else {
      this.router.navigate(['vendor-profile']);
    }
  }
}
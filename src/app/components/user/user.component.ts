import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { faEdit, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: User[];
  userToDelete: User;
  faEdit = faEdit;
  faUserMinus = faUserMinus;
  constructor(
    private userService: UserService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((response) => {
      this.users = response.data;
    });
  }

  deleteUser() {
    this.userService.deleteUser(this.userToDelete).subscribe(() => {
      this.toastrService.success(this.userToDelete.firstName, 'Kullanici silindi');
      document.getElementById('deleteUserModal').click();
      this.userToDelete = void 0;
    });
  }

  setUserToDelete(user: User): void {
    this.userToDelete = user;
  }
}

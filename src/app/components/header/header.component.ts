import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  $userSubscription!: Subscription;
  isUserAuthenticated: boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.$userSubscription = this.authService.user.subscribe((user) => {
      this.isUserAuthenticated = !!user && !!user.token;
    });
  }
  ngOnDestroy(): void {
    this.$userSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}

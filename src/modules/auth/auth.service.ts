import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async guestLogin() {
    const user = await this.usersService.createGuestUser();
    const payload = { email: user.email, sub: user._id, isGuest: user.isGuest };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        isGuest: user.isGuest
      }
    };
  }
}

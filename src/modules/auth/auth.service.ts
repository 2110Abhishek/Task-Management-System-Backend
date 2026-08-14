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
    try {
      const user = await this.usersService.createGuestUser();
      const userId = user._id ? user._id.toString() : 'guest-id-' + Date.now();
      const payload = { email: user.email, sub: userId, isGuest: user.isGuest };
      
      const token = this.jwtService.sign(payload);
      return {
        access_token: token,
        user: {
          id: userId,
          email: user.email || 'guest@example.com',
          name: user.name || 'Dexter',
          isGuest: true
        }
      };
    } catch (error) {
      console.error('Error during guest login:', error);
      // Fallback guest session in case DB write encounters issue
      const fallbackId = 'guest-' + Date.now();
      const payload = { email: 'guest@example.com', sub: fallbackId, isGuest: true };
      const token = this.jwtService.sign(payload);
      return {
        access_token: token,
        user: {
          id: fallbackId,
          email: 'guest@example.com',
          name: 'Dexter',
          isGuest: true
        }
      };
    }
  }
}

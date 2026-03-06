import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { RegisterUseCase } from './application/use-cases/register.use-case.js';
import { LoginUseCase } from './application/use-cases/login.use-case.js';
import { RegisterDto } from './application/dto/register.dto.js';
import { LoginDto } from './application/dto/login.dto.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';
import { type UserRepositoryPort, USER_REPOSITORY_PORT } from './domain/user-repository.port.js';
import { Inject } from '@nestjs/common';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    @Inject(USER_REPOSITORY_PORT)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  @Post()
  async register(@Body() dto: RegisterDto) {
    return this.registerUseCase.execute(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Request() req: { user: { id: number; email: string; role: string } }) {
    const user = await this.userRepository.findById(req.user.id);
    if (!user) {
      return null;
    }
    const { password, ...result } = user;
    return result;
  }
}

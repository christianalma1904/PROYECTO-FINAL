// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // <-- Prefijo de controlador 'auth'
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register') // <-- Ruta '/register' dentro del prefijo 'auth'
  register(@Body() dto: { nombre: string; email: string; password: string }) {
    return this.authService.register(dto);
  }

  @Post('login') // <-- Ruta '/login' dentro del prefijo 'auth'
  login(@Body() dto: { email: string; password: string }) {
    return this.authService.login(dto);
  }
}
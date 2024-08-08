import { Controller, HttpCode, Post, UsePipes, ValidationPipe, Body, Res, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from 'src/dto/auth.dto';
import { Request, Response } from 'express';
import { LoginDto } from 'src/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { refreshToken, ...response } = await this.authService.login(dto)
    this.authService.addRefresheTokenToResponse(res, refreshToken)

    return response
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const { refreshToken, ...response } = await this.authService.register(dto)
    this.authService.addRefresheTokenToResponse(res, refreshToken)

    return response
  }

  @HttpCode(200)
  @Post('login/access-token')
  async getNewTokens(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshTokenFromCookies = req.cookies[this.authService.REFRESH_TOKEN_NAME]

    if (!refreshTokenFromCookies) {
      this.authService.removeRefresheTokenFromResponse(res)
      throw new UnauthorizedException('Refresh token not passed')
    }

    const { refreshToken, ...response } = await this.authService.getNewTokens(refreshTokenFromCookies)

    this.authService.addRefresheTokenToResponse(res, refreshToken)

    return response
  }

  @HttpCode(200)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    this.authService.removeRefresheTokenFromResponse(res)

    return true
  }
}

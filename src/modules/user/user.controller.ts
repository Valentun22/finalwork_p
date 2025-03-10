import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { UserService } from './services/user.service';
import { UserResDto } from './dto/res/user.res.dto';
import { UpdateUserDto } from './dto/req/update-user.dto';
import {BaseUserReqDto} from "./dto/req/base-user.req.dto";

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a personal account' })
  @Get('me')
  public async findMe(
      @CurrentUser() userData: IUserData,
      @Body() dto: BaseUserReqDto,
  ): Promise<UserResDto> {
    return await this.userService.findMe(userData, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update your account' })
  @Put('me')
  public async updateMe(
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResDto> {
    return await this.userService.updateMe(userData, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user account' })
  @Get(':userId')
  public async getPublicUser(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<UserResDto> {
    return await this.userService.getPublicUser(userId);
  }

  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete your account' })
  @Delete(':userId')
  public async delete(
    @CurrentUser() userData: IUserData,
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    await this.userService.delete(userData, userId);
  }
}

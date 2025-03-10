import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { regexConstant } from '../../../../constants/regex.constants';

export class BaseUserReqDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(3, 100)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Transform(TransformHelper.trim)
  @Length(0, 500)
  bio?: string;

  @ApiProperty({
    default: '25',
    description: '18+',
  })
  @IsOptional()
  public readonly age: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Transform(TransformHelper.trim)
  @Length(0, 5000)
  image?: string;

  @ApiProperty({
    default: 'testEmail@gmail.com',
    description: 'Field for valid mail',
  })
  @IsString()
  @Length(0, 300)
  @Matches(regexConstant.EMAIL)
  @Type(() => String)
  email: string;

  @ApiProperty({
    default: 'passWord123!$!',
    description: 'TField for valid password',
  })
  @IsString()
  @Length(0, 300)
  @Matches(regexConstant.PASSWORD)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  password: string;
}

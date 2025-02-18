import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber } from 'class-validator';

export class ChangeBalanceDto {
  @ApiProperty({ type: 'number', example: -2, description: 'amount of balance cange' })
  @IsDefined()
  @IsNumber()
  amount: number;
}

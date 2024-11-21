import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsUUID } from 'class-validator';

export class CreateProjectDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;
    
    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    manager_id: number;
}
import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    project_id: number;

    @ApiProperty()
    user_id: number;

    @ApiProperty()
    status: string;

    @ApiProperty()
    due_date: Date;
}

import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from './../public.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Public()
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.usersService.findOneById(+id);
    }

    @Public()
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.usersService.remove(+id);
    }
}
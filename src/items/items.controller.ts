import { AuthGuard } from '@nestjs/passport';
import {
  Get,
  Post,
  Body,
  Controller,
  UsePipes,
  Delete,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateItemDto } from './create-item.dto';
import { ItemsService } from './items.service';
import { Item } from './items.interface';
import { ValidationPipe } from '../common/validation.pipe';

@Controller('items')
export class ItemsController {

  constructor(private readonly itemsService: ItemsService) { }

  @Get()
  async findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id): Promise<Item[]> {
    return this.itemsService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async create(@Body() createItemDto: CreateItemDto) {
    this.itemsService.create(createItemDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteItem(@Param('id') id) {
    this.itemsService.delete(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateItem(@Param('id') id, @Body() createItemDto: CreateItemDto) {
    this.itemsService.updateItem(id, createItemDto);
  }
}

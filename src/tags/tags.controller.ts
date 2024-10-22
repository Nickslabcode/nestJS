import { TagsService } from './providers/tags.service';
import {
  Body,
  Controller,
  Delete,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTagDto } from './dtos/create-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(
    // Inject TagsService
    private readonly tagsService: TagsService,
  ) {}

  // Add a POST end point to create new tags
  @Post()
  public create(@Body() createTagDto: CreateTagDto) {
    console.log(createTagDto);
    return this.tagsService.create(createTagDto);
  }

  @Delete()
  public async delete(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.delete(id);
  }

  // /tags/soft-delete
  @Delete('soft-delete')
  public async softDelete(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.softRemove(id);
  }
}

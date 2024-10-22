import { CreatePostMetaOptionsDto } from './dtos/create-post-meta-options.dto';
import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { MetaOptionsService } from './providers/meta-options.service';

@Controller('meta-options')
@ApiTags('MetaOptions')
export class MetaOptionsController {
  constructor(
    /**
     * Inject MetaOptionsService
     */
    private readonly metaOptionsService: MetaOptionsService,
  ) {}

  @Post()
  public create(@Body() createMetaOptionsDto: CreatePostMetaOptionsDto) {
    console.log(createMetaOptionsDto);
    return this.metaOptionsService.create(createMetaOptionsDto);
  }
}

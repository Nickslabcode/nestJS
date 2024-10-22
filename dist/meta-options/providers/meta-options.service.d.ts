import { CreatePostMetaOptionsDto } from './../dtos/create-post-meta-options.dto';
import { Repository } from 'typeorm';
import { MetaOption } from '../meta-option.entity';
export declare class MetaOptionsService {
    private readonly metaOptionsRepository;
    constructor(metaOptionsRepository: Repository<MetaOption>);
    create(createPostMetaOptionsDto: CreatePostMetaOptionsDto): Promise<MetaOption>;
}

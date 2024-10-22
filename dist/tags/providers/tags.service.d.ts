import { Repository } from 'typeorm';
import { Tag } from '../tag.entity';
import { CreateTagDto } from '../dtos/create-tag.dto';
export declare class TagsService {
    private readonly tagsRepository;
    constructor(tagsRepository: Repository<Tag>);
    create(createTagDto: CreateTagDto): Promise<Tag>;
    findMultipleTags(tags: number[]): Promise<Tag[]>;
    delete(id: number): Promise<{
        deleted: boolean;
        id: number;
    }>;
    softRemove(id: number): Promise<{
        deleted: boolean;
        id: number;
    }>;
}

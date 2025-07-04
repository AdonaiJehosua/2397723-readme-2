import {IsArray, IsEnum, IsIn, IsMongoId, IsNumber, IsOptional, IsUUID} from 'class-validator';
import {Transform} from 'class-transformer';
import {SortDirectionEnum, SortEnum} from '@project/types';
import {POST} from '../blog-post.constant';

export class BlogPostQuery {
  @Transform(({value}) => +value || POST.COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = POST.COUNT_LIMIT;

  @IsUUID('all', {each: true})
  @IsArray()
  @IsOptional()
  public tags?: string[];

  @IsMongoId()
  @IsOptional()
  public userId: string;

  @IsEnum(SortEnum)
  @IsOptional()
  public sortType: SortEnum;

  @IsIn(Object.values(SortDirectionEnum))
  @IsOptional()
  public sortDirection: SortDirectionEnum = POST.SORT_DIRECTION;

  @Transform(({value}) => +value || POST.PAGE_COUNT)
  @IsOptional()
  public page: number = POST.PAGE_COUNT;
}

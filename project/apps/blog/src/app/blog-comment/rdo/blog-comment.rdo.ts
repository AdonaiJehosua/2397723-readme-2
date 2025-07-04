import { Expose } from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class BlogCommentRdo {
  @ApiProperty({
    description: 'Post ID',
    example: 'aaa-aaa-aaa',
  })
  @Expose()
  public postId: string;

  @ApiProperty({
    description: 'Text of comment',
    example: 'Some text of comment',
  })
  @Expose()
  public message: string;

  @ApiProperty({
    description: 'Mongo ID of user who create a comment',
    example: 'aaa-aaa-aaa'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Date of create comment',
    example: '2024-01-01 00:00:00',
  })
  @Expose()
  public createdAt: string;
}

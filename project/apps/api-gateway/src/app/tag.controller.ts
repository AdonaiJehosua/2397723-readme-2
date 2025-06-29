import {Body, Controller, Get, HttpException, Post, UseFilters, UseGuards, UseInterceptors} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {ApiTags} from '@nestjs/swagger';
import {CheckAuthGuard} from './guards/check-auth.guard';
import {UserIdInterceptor} from './interceptors/user-id.interceptor';
import {ApplicationServiceURL} from './app.config';
import {CreateTagDto} from './dto/tag/create-tag.dto';
import {AxiosExceptionFilter} from './filters/axios-exception.filter';

@ApiTags('Tags routes')
@Controller('tags')
@UseFilters(AxiosExceptionFilter)
export class TagsController {
  constructor(
    private readonly httpService: HttpService,
  ) {
  }

  @Get('/')
  public async index() {
    try {
      const {data} = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tags}`);

      return data;
    } catch ({response}) {
      throw new HttpException(response?.data?.message, response?.data?.statusCode);
    }
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post('/')
  public async create(
    @Body()
      dto: CreateTagDto,
  ) {
    try {
      const {data} = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Tags}`, dto);

      return data;
    } catch ({response}) {
      throw new HttpException(response?.data?.message, response?.data?.statusCode);
    }
  }
}

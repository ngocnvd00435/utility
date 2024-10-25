import {
  Body,
  Request,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
  Query,
} from '@nestjs/common';

import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('test')
  async test(@Request() req: any) {

    this.addressService.test();
    return { status: 'ok' };
  }

  @Get('places')
  async places(
    @Request() req: any,
    @Query('path') path: string,
  ) {
    return this.addressService.findByLevelAndPath({path});
  }

  @Post('create')
  async register(
  ) {
    return this.addressService.create();
  }
}

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthCreateCustomerDto, AppHealthCreateCustomerHandler, AppHealthCustomerDto } from '@api/app-health/customer';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] customer')
@Controller('app-health/customer/create')
export class AppHealthCreateCustomerController
{
    constructor(
        private readonly handler: AppHealthCreateCustomerHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create customer' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: AppHealthCustomerDto })
    async main(
        @Body() payload: AppHealthCreateCustomerDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

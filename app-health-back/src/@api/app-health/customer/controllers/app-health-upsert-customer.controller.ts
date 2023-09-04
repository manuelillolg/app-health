/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthCustomerDto, AppHealthUpdateCustomerByIdDto, AppHealthUpsertCustomerHandler } from '@api/app-health/customer';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] customer')
@Controller('app-health/customer/upsert')
export class AppHealthUpsertCustomerController
{
    constructor(
        private readonly handler: AppHealthUpsertCustomerHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert customer' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: AppHealthCustomerDto })
    async main(
        @Body() payload: AppHealthUpdateCustomerByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

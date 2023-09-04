/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationDto, AppHealthUpdateApplicationByIdDto, AppHealthUpsertApplicationHandler } from '@api/app-health/application';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application')
@Controller('app-health/application/upsert')
export class AppHealthUpsertApplicationController
{
    constructor(
        private readonly handler: AppHealthUpsertApplicationHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert application' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: AppHealthApplicationDto })
    async main(
        @Body() payload: AppHealthUpdateApplicationByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

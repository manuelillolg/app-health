/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationIntegrationDto, AppHealthUpdateApplicationIntegrationByIdDto, AppHealthUpsertApplicationIntegrationHandler } from '@api/app-health/application-integration';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-integration')
@Controller('app-health/application-integration/upsert')
export class AppHealthUpsertApplicationIntegrationController
{
    constructor(
        private readonly handler: AppHealthUpsertApplicationIntegrationHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert application-integration' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: AppHealthApplicationIntegrationDto })
    async main(
        @Body() payload: AppHealthUpdateApplicationIntegrationByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationIntegrationDto, AppHealthCreateApplicationIntegrationDto, AppHealthCreateApplicationIntegrationHandler } from '@api/app-health/application-integration';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-integration')
@Controller('app-health/application-integration/create')
export class AppHealthCreateApplicationIntegrationController
{
    constructor(
        private readonly handler: AppHealthCreateApplicationIntegrationHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create application-integration' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: AppHealthApplicationIntegrationDto })
    async main(
        @Body() payload: AppHealthCreateApplicationIntegrationDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

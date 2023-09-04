/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationIntegrationDto, AppHealthCreateApplicationIntegrationDto, AppHealthCreateApplicationIntegrationsHandler } from '@api/app-health/application-integration';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-integration')
@Controller('app-health/application-integrations/create')
export class AppHealthCreateApplicationIntegrationsController
{
    constructor(
        private readonly handler: AppHealthCreateApplicationIntegrationsHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create application-integrations in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [AppHealthApplicationIntegrationDto]})
    @ApiBody({ type: [AppHealthCreateApplicationIntegrationDto]})
    async main(
        @Body() payload: AppHealthCreateApplicationIntegrationDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

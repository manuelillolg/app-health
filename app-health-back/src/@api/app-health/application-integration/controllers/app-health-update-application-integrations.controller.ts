/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationIntegrationDto, AppHealthUpdateApplicationIntegrationsDto, AppHealthUpdateApplicationIntegrationsHandler } from '@api/app-health/application-integration';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-integration')
@Controller('app-health/application-integrations/update')
export class AppHealthUpdateApplicationIntegrationsController
{
    constructor(
        private readonly handler: AppHealthUpdateApplicationIntegrationsHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update application-integrations' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AppHealthApplicationIntegrationDto })
    async main(
        @Body() payload: AppHealthUpdateApplicationIntegrationsDto,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}

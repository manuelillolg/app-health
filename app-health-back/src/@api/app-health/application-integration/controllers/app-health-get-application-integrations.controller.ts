/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationIntegrationDto, AppHealthGetApplicationIntegrationsHandler } from '@api/app-health/application-integration';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-integration')
@Controller('app-health/application-integrations/get')
export class AppHealthGetApplicationIntegrationsController
{
    constructor(
        private readonly handler: AppHealthGetApplicationIntegrationsHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get application-integrations according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [AppHealthApplicationIntegrationDto]})
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationIntegrationDto, AppHealthFindApplicationIntegrationHandler } from '@api/app-health/application-integration';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-integration')
@Controller('app-health/application-integration/find')
export class AppHealthFindApplicationIntegrationController
{
    constructor(
        private readonly handler: AppHealthFindApplicationIntegrationHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find application-integration according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: AppHealthApplicationIntegrationDto })
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

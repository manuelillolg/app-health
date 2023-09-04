/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationDatabaseDto, AppHealthFindApplicationDatabaseHandler } from '@api/app-health/application-database';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-database')
@Controller('app-health/application-database/find')
export class AppHealthFindApplicationDatabaseController
{
    constructor(
        private readonly handler: AppHealthFindApplicationDatabaseHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find application-database according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: AppHealthApplicationDatabaseDto })
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

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationDto, AppHealthFindApplicationHandler } from '@api/app-health/application';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application')
@Controller('app-health/application/find')
export class AppHealthFindApplicationController
{
    constructor(
        private readonly handler: AppHealthFindApplicationHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find application according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: AppHealthApplicationDto })
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

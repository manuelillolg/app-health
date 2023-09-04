/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationAuthenticationDto, AppHealthFindApplicationAuthenticationHandler } from '@api/app-health/application-authentication';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-authentication')
@Controller('app-health/application-authentication/find')
export class AppHealthFindApplicationAuthenticationController
{
    constructor(
        private readonly handler: AppHealthFindApplicationAuthenticationHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find application-authentication according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: AppHealthApplicationAuthenticationDto })
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

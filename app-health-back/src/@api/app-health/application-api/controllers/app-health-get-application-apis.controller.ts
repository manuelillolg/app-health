/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationApiDto, AppHealthGetApplicationApisHandler } from '@api/app-health/application-api';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-api')
@Controller('app-health/application-apis/get')
export class AppHealthGetApplicationApisController
{
    constructor(
        private readonly handler: AppHealthGetApplicationApisHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get application-apis according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [AppHealthApplicationApiDto]})
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

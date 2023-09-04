/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthPaginateApplicationAuthenticationsHandler } from '@api/app-health/application-authentication';
import { Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-authentication')
@Controller('app-health/application-authentications/paginate')
export class AppHealthPaginateApplicationAuthenticationsController
{
    constructor(
        private readonly handler: AppHealthPaginateApplicationAuthenticationsHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Paginate application-authentications' })
    @ApiOkResponse({ description: 'The records has been paginated successfully.', type: Pagination })
    @ApiQuery({ name: 'queryStatement', type: QueryStatement })
    @ApiQuery({ name: 'constraint', type: QueryStatement })
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

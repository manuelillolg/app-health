/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationAuthorizationDto, AppHealthDeleteApplicationAuthorizationsHandler } from '@api/app-health/application-authorization';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-authorization')
@Controller('app-health/application-authorizations/delete')
export class AppHealthDeleteApplicationAuthorizationsController
{
    constructor(
        private readonly handler: AppHealthDeleteApplicationAuthorizationsHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete application-authorizations in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [AppHealthApplicationAuthorizationDto]})
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

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationAuthenticationDto, AppHealthDeleteApplicationAuthenticationsHandler } from '@api/app-health/application-authentication';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-authentication')
@Controller('app-health/application-authentications/delete')
export class AppHealthDeleteApplicationAuthenticationsController
{
    constructor(
        private readonly handler: AppHealthDeleteApplicationAuthenticationsHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete application-authentications in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [AppHealthApplicationAuthenticationDto]})
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

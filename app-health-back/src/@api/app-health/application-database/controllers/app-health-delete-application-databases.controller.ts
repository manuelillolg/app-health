/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationDatabaseDto, AppHealthDeleteApplicationDatabasesHandler } from '@api/app-health/application-database';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-database')
@Controller('app-health/application-databases/delete')
export class AppHealthDeleteApplicationDatabasesController
{
    constructor(
        private readonly handler: AppHealthDeleteApplicationDatabasesHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete application-databases in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [AppHealthApplicationDatabaseDto]})
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

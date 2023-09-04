/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthDatabaseDto, AppHealthDeleteDatabasesHandler } from '@api/app-health/database';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] database')
@Controller('app-health/databases/delete')
export class AppHealthDeleteDatabasesController
{
    constructor(
        private readonly handler: AppHealthDeleteDatabasesHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete databases in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [AppHealthDatabaseDto]})
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

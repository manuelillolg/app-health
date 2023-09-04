/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationApiDto, AppHealthDeleteApplicationApisHandler } from '@api/app-health/application-api';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-api')
@Controller('app-health/application-apis/delete')
export class AppHealthDeleteApplicationApisController
{
    constructor(
        private readonly handler: AppHealthDeleteApplicationApisHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete application-apis in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [AppHealthApplicationApiDto]})
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

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApiInterfaceTypeDto, AppHealthDeleteApiInterfaceTypesHandler } from '@api/app-health/api-interface-type';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] api-interface-type')
@Controller('app-health/api-interface-types/delete')
export class AppHealthDeleteApiInterfaceTypesController
{
    constructor(
        private readonly handler: AppHealthDeleteApiInterfaceTypesHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete api-interface-types in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [AppHealthApiInterfaceTypeDto]})
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

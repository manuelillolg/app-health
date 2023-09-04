/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthDeleteInfrastructureProvidersHandler, AppHealthInfrastructureProviderDto } from '@api/app-health/infrastructure-provider';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] infrastructure-provider')
@Controller('app-health/infrastructure-providers/delete')
export class AppHealthDeleteInfrastructureProvidersController
{
    constructor(
        private readonly handler: AppHealthDeleteInfrastructureProvidersHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete infrastructure-providers in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [AppHealthInfrastructureProviderDto]})
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

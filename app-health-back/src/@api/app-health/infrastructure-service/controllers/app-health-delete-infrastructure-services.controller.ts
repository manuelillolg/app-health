/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthDeleteInfrastructureServicesHandler, AppHealthInfrastructureServiceDto } from '@api/app-health/infrastructure-service';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] infrastructure-service')
@Controller('app-health/infrastructure-services/delete')
export class AppHealthDeleteInfrastructureServicesController
{
    constructor(
        private readonly handler: AppHealthDeleteInfrastructureServicesHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete infrastructure-services in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [AppHealthInfrastructureServiceDto]})
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

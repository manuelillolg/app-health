/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthPaginateInfrastructureProvidersHandler } from '@api/app-health/infrastructure-provider';
import { Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] infrastructure-provider')
@Controller('app-health/infrastructure-providers/paginate')
export class AppHealthPaginateInfrastructureProvidersController
{
    constructor(
        private readonly handler: AppHealthPaginateInfrastructureProvidersHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Paginate infrastructure-providers' })
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

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthFindInfrastructureProviderHandler, AppHealthInfrastructureProviderDto } from '@api/app-health/infrastructure-provider';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] infrastructure-provider')
@Controller('app-health/infrastructure-provider/find')
export class AppHealthFindInfrastructureProviderController
{
    constructor(
        private readonly handler: AppHealthFindInfrastructureProviderHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find infrastructure-provider according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: AppHealthInfrastructureProviderDto })
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

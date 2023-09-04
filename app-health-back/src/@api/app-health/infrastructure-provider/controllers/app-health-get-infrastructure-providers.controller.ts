/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthGetInfrastructureProvidersHandler, AppHealthInfrastructureProviderDto } from '@api/app-health/infrastructure-provider';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] infrastructure-provider')
@Controller('app-health/infrastructure-providers/get')
export class AppHealthGetInfrastructureProvidersController
{
    constructor(
        private readonly handler: AppHealthGetInfrastructureProvidersHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get infrastructure-providers according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [AppHealthInfrastructureProviderDto]})
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

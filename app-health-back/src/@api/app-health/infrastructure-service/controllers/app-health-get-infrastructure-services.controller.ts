/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthGetInfrastructureServicesHandler, AppHealthInfrastructureServiceDto } from '@api/app-health/infrastructure-service';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] infrastructure-service')
@Controller('app-health/infrastructure-services/get')
export class AppHealthGetInfrastructureServicesController
{
    constructor(
        private readonly handler: AppHealthGetInfrastructureServicesHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get infrastructure-services according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [AppHealthInfrastructureServiceDto]})
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

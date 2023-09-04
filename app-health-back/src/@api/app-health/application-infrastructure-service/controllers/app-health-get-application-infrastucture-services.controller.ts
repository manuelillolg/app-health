/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationInfrastructureServiceDto, AppHealthGetApplicationInfrastuctureServicesHandler } from '@api/app-health/application-infrastructure-service';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-infrastructure-service')
@Controller('app-health/application-infrastucture-services/get')
export class AppHealthGetApplicationInfrastuctureServicesController
{
    constructor(
        private readonly handler: AppHealthGetApplicationInfrastuctureServicesHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get application-infrastucture-services according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [AppHealthApplicationInfrastructureServiceDto]})
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

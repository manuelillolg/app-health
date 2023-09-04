/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthFindInfrastructureProviderByIdHandler, AppHealthInfrastructureProviderDto } from '@api/app-health/infrastructure-provider';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] infrastructure-provider')
@Controller('app-health/infrastructure-provider/find')
export class AppHealthFindInfrastructureProviderByIdController
{
    constructor(
        private readonly handler: AppHealthFindInfrastructureProviderByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find infrastructure-provider by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: AppHealthInfrastructureProviderDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}

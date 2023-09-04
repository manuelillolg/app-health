/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthFindInfrastructureServiceByIdHandler, AppHealthInfrastructureServiceDto } from '@api/app-health/infrastructure-service';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] infrastructure-service')
@Controller('app-health/infrastructure-service/find')
export class AppHealthFindInfrastructureServiceByIdController
{
    constructor(
        private readonly handler: AppHealthFindInfrastructureServiceByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find infrastructure-service by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: AppHealthInfrastructureServiceDto })
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

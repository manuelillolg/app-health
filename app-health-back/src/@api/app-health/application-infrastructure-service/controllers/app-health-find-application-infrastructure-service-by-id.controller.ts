/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationInfrastructureServiceDto, AppHealthFindApplicationInfrastructureServiceByIdHandler } from '@api/app-health/application-infrastructure-service';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-infrastructure-service')
@Controller('app-health/application-infrastructure-service/find')
export class AppHealthFindApplicationInfrastructureServiceByIdController
{
    constructor(
        private readonly handler: AppHealthFindApplicationInfrastructureServiceByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find application-infrastructure-service by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: AppHealthApplicationInfrastructureServiceDto })
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

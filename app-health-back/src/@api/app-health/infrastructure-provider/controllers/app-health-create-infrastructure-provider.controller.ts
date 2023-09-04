/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthCreateInfrastructureProviderDto, AppHealthCreateInfrastructureProviderHandler, AppHealthInfrastructureProviderDto } from '@api/app-health/infrastructure-provider';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] infrastructure-provider')
@Controller('app-health/infrastructure-provider/create')
export class AppHealthCreateInfrastructureProviderController
{
    constructor(
        private readonly handler: AppHealthCreateInfrastructureProviderHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create infrastructure-provider' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: AppHealthInfrastructureProviderDto })
    async main(
        @Body() payload: AppHealthCreateInfrastructureProviderDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

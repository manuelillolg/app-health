/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthInfrastructureProviderDto, AppHealthUpdateInfrastructureProviderByIdDto, AppHealthUpsertInfrastructureProviderHandler } from '@api/app-health/infrastructure-provider';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] infrastructure-provider')
@Controller('app-health/infrastructure-provider/upsert')
export class AppHealthUpsertInfrastructureProviderController
{
    constructor(
        private readonly handler: AppHealthUpsertInfrastructureProviderHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert infrastructure-provider' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: AppHealthInfrastructureProviderDto })
    async main(
        @Body() payload: AppHealthUpdateInfrastructureProviderByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

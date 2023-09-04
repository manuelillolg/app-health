/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthInfrastructureServiceDto, AppHealthUpdateInfrastructureServiceByIdDto, AppHealthUpsertInfrastructureServiceHandler } from '@api/app-health/infrastructure-service';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] infrastructure-service')
@Controller('app-health/infrastructure-service/upsert')
export class AppHealthUpsertInfrastructureServiceController
{
    constructor(
        private readonly handler: AppHealthUpsertInfrastructureServiceHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert infrastructure-service' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: AppHealthInfrastructureServiceDto })
    async main(
        @Body() payload: AppHealthUpdateInfrastructureServiceByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

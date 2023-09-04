/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationInfrastructureServiceDto, AppHealthUpdateApplicationInfrastructureServiceByIdDto, AppHealthUpsertApplicationInfrastructureServiceHandler } from '@api/app-health/application-infrastructure-service';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-infrastructure-service')
@Controller('app-health/application-infrastructure-service/upsert')
export class AppHealthUpsertApplicationInfrastructureServiceController
{
    constructor(
        private readonly handler: AppHealthUpsertApplicationInfrastructureServiceHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert application-infrastructure-service' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: AppHealthApplicationInfrastructureServiceDto })
    async main(
        @Body() payload: AppHealthUpdateApplicationInfrastructureServiceByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

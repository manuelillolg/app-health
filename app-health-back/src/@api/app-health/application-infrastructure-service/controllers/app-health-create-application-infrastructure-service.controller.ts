/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationInfrastructureServiceDto, AppHealthCreateApplicationInfrastructureServiceDto, AppHealthCreateApplicationInfrastructureServiceHandler } from '@api/app-health/application-infrastructure-service';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-infrastructure-service')
@Controller('app-health/application-infrastructure-service/create')
export class AppHealthCreateApplicationInfrastructureServiceController
{
    constructor(
        private readonly handler: AppHealthCreateApplicationInfrastructureServiceHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create application-infrastructure-service' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: AppHealthApplicationInfrastructureServiceDto })
    async main(
        @Body() payload: AppHealthCreateApplicationInfrastructureServiceDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

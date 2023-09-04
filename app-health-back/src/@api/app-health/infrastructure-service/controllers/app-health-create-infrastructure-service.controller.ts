/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthCreateInfrastructureServiceDto, AppHealthCreateInfrastructureServiceHandler, AppHealthInfrastructureServiceDto } from '@api/app-health/infrastructure-service';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] infrastructure-service')
@Controller('app-health/infrastructure-service/create')
export class AppHealthCreateInfrastructureServiceController
{
    constructor(
        private readonly handler: AppHealthCreateInfrastructureServiceHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create infrastructure-service' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: AppHealthInfrastructureServiceDto })
    async main(
        @Body() payload: AppHealthCreateInfrastructureServiceDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

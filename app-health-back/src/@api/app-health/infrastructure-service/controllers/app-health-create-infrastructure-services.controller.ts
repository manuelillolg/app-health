/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthCreateInfrastructureServiceDto, AppHealthCreateInfrastructureServicesHandler, AppHealthInfrastructureServiceDto } from '@api/app-health/infrastructure-service';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] infrastructure-service')
@Controller('app-health/infrastructure-services/create')
export class AppHealthCreateInfrastructureServicesController
{
    constructor(
        private readonly handler: AppHealthCreateInfrastructureServicesHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create infrastructure-services in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [AppHealthInfrastructureServiceDto]})
    @ApiBody({ type: [AppHealthCreateInfrastructureServiceDto]})
    async main(
        @Body() payload: AppHealthCreateInfrastructureServiceDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

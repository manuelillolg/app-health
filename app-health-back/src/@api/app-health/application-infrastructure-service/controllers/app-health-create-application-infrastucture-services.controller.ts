/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationInfrastructureServiceDto, AppHealthCreateApplicationInfrastructureServiceDto, AppHealthCreateApplicationInfrastuctureServicesHandler } from '@api/app-health/application-infrastructure-service';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-infrastructure-service')
@Controller('app-health/application-infrastucture-services/create')
export class AppHealthCreateApplicationInfrastuctureServicesController
{
    constructor(
        private readonly handler: AppHealthCreateApplicationInfrastuctureServicesHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create application-infrastucture-services in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [AppHealthApplicationInfrastructureServiceDto]})
    @ApiBody({ type: [AppHealthCreateApplicationInfrastructureServiceDto]})
    async main(
        @Body() payload: AppHealthCreateApplicationInfrastructureServiceDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

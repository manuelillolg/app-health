/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthCreateInfrastructureProviderDto, AppHealthCreateInfrastructureProvidersHandler, AppHealthInfrastructureProviderDto } from '@api/app-health/infrastructure-provider';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] infrastructure-provider')
@Controller('app-health/infrastructure-providers/create')
export class AppHealthCreateInfrastructureProvidersController
{
    constructor(
        private readonly handler: AppHealthCreateInfrastructureProvidersHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create infrastructure-providers in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [AppHealthInfrastructureProviderDto]})
    @ApiBody({ type: [AppHealthCreateInfrastructureProviderDto]})
    async main(
        @Body() payload: AppHealthCreateInfrastructureProviderDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

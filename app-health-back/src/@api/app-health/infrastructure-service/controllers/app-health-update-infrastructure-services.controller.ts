/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthInfrastructureServiceDto, AppHealthUpdateInfrastructureServicesDto, AppHealthUpdateInfrastructureServicesHandler } from '@api/app-health/infrastructure-service';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] infrastructure-service')
@Controller('app-health/infrastructure-services/update')
export class AppHealthUpdateInfrastructureServicesController
{
    constructor(
        private readonly handler: AppHealthUpdateInfrastructureServicesHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update infrastructure-services' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AppHealthInfrastructureServiceDto })
    async main(
        @Body() payload: AppHealthUpdateInfrastructureServicesDto,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationInfrastructureServiceDto, AppHealthUpdateApplicationInfrastuctureServicesDto, AppHealthUpdateApplicationInfrastuctureServicesHandler } from '@api/app-health/application-infrastructure-service';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-infrastructure-service')
@Controller('app-health/application-infrastucture-services/update')
export class AppHealthUpdateApplicationInfrastuctureServicesController
{
    constructor(
        private readonly handler: AppHealthUpdateApplicationInfrastuctureServicesHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update application-infrastucture-services' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AppHealthApplicationInfrastructureServiceDto })
    async main(
        @Body() payload: AppHealthUpdateApplicationInfrastuctureServicesDto,
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

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationInfrastructureServiceDto, AppHealthUpdateApplicationInfrastructureServiceByIdDto, AppHealthUpdateApplicationInfrastructureServiceByIdHandler } from '@api/app-health/application-infrastructure-service';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-infrastructure-service')
@Controller('app-health/application-infrastructure-service/update')
export class AppHealthUpdateApplicationInfrastructureServiceByIdController
{
    constructor(
        private readonly handler: AppHealthUpdateApplicationInfrastructureServiceByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update application-infrastructure-service by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AppHealthApplicationInfrastructureServiceDto })
    async main(
        @Body() payload: AppHealthUpdateApplicationInfrastructureServiceByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}

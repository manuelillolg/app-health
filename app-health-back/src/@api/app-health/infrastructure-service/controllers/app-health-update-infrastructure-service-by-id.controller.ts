/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthInfrastructureServiceDto, AppHealthUpdateInfrastructureServiceByIdDto, AppHealthUpdateInfrastructureServiceByIdHandler } from '@api/app-health/infrastructure-service';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] infrastructure-service')
@Controller('app-health/infrastructure-service/update')
export class AppHealthUpdateInfrastructureServiceByIdController
{
    constructor(
        private readonly handler: AppHealthUpdateInfrastructureServiceByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update infrastructure-service by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AppHealthInfrastructureServiceDto })
    async main(
        @Body() payload: AppHealthUpdateInfrastructureServiceByIdDto,
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

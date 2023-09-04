/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationInfrastructureServiceDto, AppHealthDeleteApplicationInfrastructureServiceByIdHandler } from '@api/app-health/application-infrastructure-service';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-infrastructure-service')
@Controller('app-health/application-infrastructure-service/delete')
export class AppHealthDeleteApplicationInfrastructureServiceByIdController
{
    constructor(
        private readonly handler: AppHealthDeleteApplicationInfrastructureServiceByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete application-infrastructure-service by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: AppHealthApplicationInfrastructureServiceDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}

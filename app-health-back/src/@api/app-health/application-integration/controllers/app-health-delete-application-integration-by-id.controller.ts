/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationIntegrationDto, AppHealthDeleteApplicationIntegrationByIdHandler } from '@api/app-health/application-integration';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-integration')
@Controller('app-health/application-integration/delete')
export class AppHealthDeleteApplicationIntegrationByIdController
{
    constructor(
        private readonly handler: AppHealthDeleteApplicationIntegrationByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete application-integration by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: AppHealthApplicationIntegrationDto })
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

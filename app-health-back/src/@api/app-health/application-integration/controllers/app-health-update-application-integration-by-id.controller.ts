/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationIntegrationDto, AppHealthUpdateApplicationIntegrationByIdDto, AppHealthUpdateApplicationIntegrationByIdHandler } from '@api/app-health/application-integration';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-integration')
@Controller('app-health/application-integration/update')
export class AppHealthUpdateApplicationIntegrationByIdController
{
    constructor(
        private readonly handler: AppHealthUpdateApplicationIntegrationByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update application-integration by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AppHealthApplicationIntegrationDto })
    async main(
        @Body() payload: AppHealthUpdateApplicationIntegrationByIdDto,
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

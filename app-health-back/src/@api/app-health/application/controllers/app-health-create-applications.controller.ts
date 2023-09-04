/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationDto, AppHealthCreateApplicationDto, AppHealthCreateApplicationsHandler } from '@api/app-health/application';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application')
@Controller('app-health/applications/create')
export class AppHealthCreateApplicationsController
{
    constructor(
        private readonly handler: AppHealthCreateApplicationsHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create applications in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [AppHealthApplicationDto]})
    @ApiBody({ type: [AppHealthCreateApplicationDto]})
    async main(
        @Body() payload: AppHealthCreateApplicationDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

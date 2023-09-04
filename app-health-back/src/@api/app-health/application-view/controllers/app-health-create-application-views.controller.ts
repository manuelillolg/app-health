/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationViewDto, AppHealthCreateApplicationViewDto, AppHealthCreateApplicationViewsHandler } from '@api/app-health/application-view';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-view')
@Controller('app-health/application-views/create')
export class AppHealthCreateApplicationViewsController
{
    constructor(
        private readonly handler: AppHealthCreateApplicationViewsHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create application-views in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [AppHealthApplicationViewDto]})
    @ApiBody({ type: [AppHealthCreateApplicationViewDto]})
    async main(
        @Body() payload: AppHealthCreateApplicationViewDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

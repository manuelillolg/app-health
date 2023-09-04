/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationViewDto, AppHealthCreateApplicationViewDto, AppHealthCreateApplicationViewHandler } from '@api/app-health/application-view';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-view')
@Controller('app-health/application-view/create')
export class AppHealthCreateApplicationViewController
{
    constructor(
        private readonly handler: AppHealthCreateApplicationViewHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create application-view' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: AppHealthApplicationViewDto })
    async main(
        @Body() payload: AppHealthCreateApplicationViewDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

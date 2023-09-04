/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationApiDto, AppHealthCreateApplicationApiDto, AppHealthCreateApplicationApiHandler } from '@api/app-health/application-api';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-api')
@Controller('app-health/application-api/create')
export class AppHealthCreateApplicationApiController
{
    constructor(
        private readonly handler: AppHealthCreateApplicationApiHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create application-api' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: AppHealthApplicationApiDto })
    async main(
        @Body() payload: AppHealthCreateApplicationApiDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

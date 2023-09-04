/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationDto, AppHealthCreateApplicationDto, AppHealthCreateApplicationHandler } from '@api/app-health/application';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application')
@Controller('app-health/application/create')
export class AppHealthCreateApplicationController
{
    constructor(
        private readonly handler: AppHealthCreateApplicationHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create application' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: AppHealthApplicationDto })
    async main(
        @Body() payload: AppHealthCreateApplicationDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

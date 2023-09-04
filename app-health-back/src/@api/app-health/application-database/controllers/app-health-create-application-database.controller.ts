/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationDatabaseDto, AppHealthCreateApplicationDatabaseDto, AppHealthCreateApplicationDatabaseHandler } from '@api/app-health/application-database';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-database')
@Controller('app-health/application-database/create')
export class AppHealthCreateApplicationDatabaseController
{
    constructor(
        private readonly handler: AppHealthCreateApplicationDatabaseHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create application-database' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: AppHealthApplicationDatabaseDto })
    async main(
        @Body() payload: AppHealthCreateApplicationDatabaseDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

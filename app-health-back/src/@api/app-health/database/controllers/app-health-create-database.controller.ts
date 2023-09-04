/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthCreateDatabaseDto, AppHealthCreateDatabaseHandler, AppHealthDatabaseDto } from '@api/app-health/database';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] database')
@Controller('app-health/database/create')
export class AppHealthCreateDatabaseController
{
    constructor(
        private readonly handler: AppHealthCreateDatabaseHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create database' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: AppHealthDatabaseDto })
    async main(
        @Body() payload: AppHealthCreateDatabaseDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

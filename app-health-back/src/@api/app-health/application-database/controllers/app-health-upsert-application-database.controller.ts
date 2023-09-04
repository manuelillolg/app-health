/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationDatabaseDto, AppHealthUpdateApplicationDatabaseByIdDto, AppHealthUpsertApplicationDatabaseHandler } from '@api/app-health/application-database';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-database')
@Controller('app-health/application-database/upsert')
export class AppHealthUpsertApplicationDatabaseController
{
    constructor(
        private readonly handler: AppHealthUpsertApplicationDatabaseHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert application-database' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: AppHealthApplicationDatabaseDto })
    async main(
        @Body() payload: AppHealthUpdateApplicationDatabaseByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

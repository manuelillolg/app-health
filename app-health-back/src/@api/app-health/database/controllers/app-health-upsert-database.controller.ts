/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthDatabaseDto, AppHealthUpdateDatabaseByIdDto, AppHealthUpsertDatabaseHandler } from '@api/app-health/database';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] database')
@Controller('app-health/database/upsert')
export class AppHealthUpsertDatabaseController
{
    constructor(
        private readonly handler: AppHealthUpsertDatabaseHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert database' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: AppHealthDatabaseDto })
    async main(
        @Body() payload: AppHealthUpdateDatabaseByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

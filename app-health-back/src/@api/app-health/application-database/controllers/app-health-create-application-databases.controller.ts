/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationDatabaseDto, AppHealthCreateApplicationDatabaseDto, AppHealthCreateApplicationDatabasesHandler } from '@api/app-health/application-database';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-database')
@Controller('app-health/application-databases/create')
export class AppHealthCreateApplicationDatabasesController
{
    constructor(
        private readonly handler: AppHealthCreateApplicationDatabasesHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create application-databases in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [AppHealthApplicationDatabaseDto]})
    @ApiBody({ type: [AppHealthCreateApplicationDatabaseDto]})
    async main(
        @Body() payload: AppHealthCreateApplicationDatabaseDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

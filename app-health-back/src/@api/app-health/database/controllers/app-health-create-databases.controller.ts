/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthCreateDatabaseDto, AppHealthCreateDatabasesHandler, AppHealthDatabaseDto } from '@api/app-health/database';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] database')
@Controller('app-health/databases/create')
export class AppHealthCreateDatabasesController
{
    constructor(
        private readonly handler: AppHealthCreateDatabasesHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create databases in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [AppHealthDatabaseDto]})
    @ApiBody({ type: [AppHealthCreateDatabaseDto]})
    async main(
        @Body() payload: AppHealthCreateDatabaseDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

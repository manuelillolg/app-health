/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthDatabaseDto, AppHealthUpdateDatabasesDto, AppHealthUpdateDatabasesHandler } from '@api/app-health/database';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] database')
@Controller('app-health/databases/update')
export class AppHealthUpdateDatabasesController
{
    constructor(
        private readonly handler: AppHealthUpdateDatabasesHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update databases' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AppHealthDatabaseDto })
    async main(
        @Body() payload: AppHealthUpdateDatabasesDto,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}

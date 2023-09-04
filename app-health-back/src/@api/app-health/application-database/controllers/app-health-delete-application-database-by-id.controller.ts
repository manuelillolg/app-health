/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationDatabaseDto, AppHealthDeleteApplicationDatabaseByIdHandler } from '@api/app-health/application-database';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-database')
@Controller('app-health/application-database/delete')
export class AppHealthDeleteApplicationDatabaseByIdController
{
    constructor(
        private readonly handler: AppHealthDeleteApplicationDatabaseByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete application-database by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: AppHealthApplicationDatabaseDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}

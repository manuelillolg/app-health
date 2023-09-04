/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthDatabaseDto, AppHealthDeleteDatabaseByIdHandler } from '@api/app-health/database';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] database')
@Controller('app-health/database/delete')
export class AppHealthDeleteDatabaseByIdController
{
    constructor(
        private readonly handler: AppHealthDeleteDatabaseByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete database by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: AppHealthDatabaseDto })
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

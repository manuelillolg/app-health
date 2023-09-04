/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthDatabaseDto, AppHealthFindDatabaseByIdHandler } from '@api/app-health/database';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] database')
@Controller('app-health/database/find')
export class AppHealthFindDatabaseByIdController
{
    constructor(
        private readonly handler: AppHealthFindDatabaseByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find database by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: AppHealthDatabaseDto })
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

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthDatabaseDto, AppHealthUpdateDatabaseByIdDto, AppHealthUpdateDatabaseByIdHandler } from '@api/app-health/database';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] database')
@Controller('app-health/database/update')
export class AppHealthUpdateDatabaseByIdController
{
    constructor(
        private readonly handler: AppHealthUpdateDatabaseByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update database by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AppHealthDatabaseDto })
    async main(
        @Body() payload: AppHealthUpdateDatabaseByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}

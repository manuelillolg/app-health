/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationDatabaseDto, AppHealthUpdateApplicationDatabaseByIdDto, AppHealthUpdateApplicationDatabaseByIdHandler } from '@api/app-health/application-database';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-database')
@Controller('app-health/application-database/update')
export class AppHealthUpdateApplicationDatabaseByIdController
{
    constructor(
        private readonly handler: AppHealthUpdateApplicationDatabaseByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update application-database by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AppHealthApplicationDatabaseDto })
    async main(
        @Body() payload: AppHealthUpdateApplicationDatabaseByIdDto,
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

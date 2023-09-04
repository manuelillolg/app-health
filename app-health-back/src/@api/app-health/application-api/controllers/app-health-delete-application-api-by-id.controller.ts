/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationApiDto, AppHealthDeleteApplicationApiByIdHandler } from '@api/app-health/application-api';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-api')
@Controller('app-health/application-api/delete')
export class AppHealthDeleteApplicationApiByIdController
{
    constructor(
        private readonly handler: AppHealthDeleteApplicationApiByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete application-api by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: AppHealthApplicationApiDto })
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

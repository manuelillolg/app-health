/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationDto, AppHealthDeleteApplicationByIdHandler } from '@api/app-health/application';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application')
@Controller('app-health/application/delete')
export class AppHealthDeleteApplicationByIdController
{
    constructor(
        private readonly handler: AppHealthDeleteApplicationByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete application by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: AppHealthApplicationDto })
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

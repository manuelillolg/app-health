/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationViewDto, AppHealthDeleteApplicationViewByIdHandler } from '@api/app-health/application-view';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-view')
@Controller('app-health/application-view/delete')
export class AppHealthDeleteApplicationViewByIdController
{
    constructor(
        private readonly handler: AppHealthDeleteApplicationViewByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete application-view by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: AppHealthApplicationViewDto })
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

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationViewDto, AppHealthFindApplicationViewByIdHandler } from '@api/app-health/application-view';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-view')
@Controller('app-health/application-view/find')
export class AppHealthFindApplicationViewByIdController
{
    constructor(
        private readonly handler: AppHealthFindApplicationViewByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find application-view by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: AppHealthApplicationViewDto })
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

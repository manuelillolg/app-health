/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationViewDto, AppHealthUpdateApplicationViewsDto, AppHealthUpdateApplicationViewsHandler } from '@api/app-health/application-view';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-view')
@Controller('app-health/application-views/update')
export class AppHealthUpdateApplicationViewsController
{
    constructor(
        private readonly handler: AppHealthUpdateApplicationViewsHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update application-views' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AppHealthApplicationViewDto })
    async main(
        @Body() payload: AppHealthUpdateApplicationViewsDto,
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

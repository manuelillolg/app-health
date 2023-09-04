/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationViewDto, AppHealthUpdateApplicationViewByIdDto, AppHealthUpdateApplicationViewByIdHandler } from '@api/app-health/application-view';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-view')
@Controller('app-health/application-view/update')
export class AppHealthUpdateApplicationViewByIdController
{
    constructor(
        private readonly handler: AppHealthUpdateApplicationViewByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update application-view by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AppHealthApplicationViewDto })
    async main(
        @Body() payload: AppHealthUpdateApplicationViewByIdDto,
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

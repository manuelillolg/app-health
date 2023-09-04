/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationViewDto, AppHealthUpdateApplicationViewByIdDto, AppHealthUpsertApplicationViewHandler } from '@api/app-health/application-view';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-view')
@Controller('app-health/application-view/upsert')
export class AppHealthUpsertApplicationViewController
{
    constructor(
        private readonly handler: AppHealthUpsertApplicationViewHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert application-view' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: AppHealthApplicationViewDto })
    async main(
        @Body() payload: AppHealthUpdateApplicationViewByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationApiDto, AppHealthUpdateApplicationApiByIdDto, AppHealthUpsertApplicationApiHandler } from '@api/app-health/application-api';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-api')
@Controller('app-health/application-api/upsert')
export class AppHealthUpsertApplicationApiController
{
    constructor(
        private readonly handler: AppHealthUpsertApplicationApiHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert application-api' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: AppHealthApplicationApiDto })
    async main(
        @Body() payload: AppHealthUpdateApplicationApiByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

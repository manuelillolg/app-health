/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthLanguageDto, AppHealthUpdateLanguageByIdDto, AppHealthUpsertLanguageHandler } from '@api/app-health/language';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] language')
@Controller('app-health/language/upsert')
export class AppHealthUpsertLanguageController
{
    constructor(
        private readonly handler: AppHealthUpsertLanguageHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert language' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: AppHealthLanguageDto })
    async main(
        @Body() payload: AppHealthUpdateLanguageByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

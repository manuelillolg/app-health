/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationLanguageDto, AppHealthUpdateApplicationLanguageByIdDto, AppHealthUpsertApplicationLanguageHandler } from '@api/app-health/application-language';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-language')
@Controller('app-health/application-language/upsert')
export class AppHealthUpsertApplicationLanguageController
{
    constructor(
        private readonly handler: AppHealthUpsertApplicationLanguageHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert application-language' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: AppHealthApplicationLanguageDto })
    async main(
        @Body() payload: AppHealthUpdateApplicationLanguageByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

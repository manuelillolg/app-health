/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationLanguageDto, AppHealthCreateApplicationLanguageDto, AppHealthCreateApplicationLanguageHandler } from '@api/app-health/application-language';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-language')
@Controller('app-health/application-language/create')
export class AppHealthCreateApplicationLanguageController
{
    constructor(
        private readonly handler: AppHealthCreateApplicationLanguageHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create application-language' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: AppHealthApplicationLanguageDto })
    async main(
        @Body() payload: AppHealthCreateApplicationLanguageDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

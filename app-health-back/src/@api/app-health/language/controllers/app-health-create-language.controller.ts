/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthCreateLanguageDto, AppHealthCreateLanguageHandler, AppHealthLanguageDto } from '@api/app-health/language';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] language')
@Controller('app-health/language/create')
export class AppHealthCreateLanguageController
{
    constructor(
        private readonly handler: AppHealthCreateLanguageHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create language' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: AppHealthLanguageDto })
    async main(
        @Body() payload: AppHealthCreateLanguageDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

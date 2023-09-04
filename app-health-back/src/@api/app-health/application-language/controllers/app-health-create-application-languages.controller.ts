/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationLanguageDto, AppHealthCreateApplicationLanguageDto, AppHealthCreateApplicationLanguagesHandler } from '@api/app-health/application-language';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-language')
@Controller('app-health/application-languages/create')
export class AppHealthCreateApplicationLanguagesController
{
    constructor(
        private readonly handler: AppHealthCreateApplicationLanguagesHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create application-languages in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [AppHealthApplicationLanguageDto]})
    @ApiBody({ type: [AppHealthCreateApplicationLanguageDto]})
    async main(
        @Body() payload: AppHealthCreateApplicationLanguageDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

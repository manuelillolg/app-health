/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthCreateLanguageDto, AppHealthCreateLanguagesHandler, AppHealthLanguageDto } from '@api/app-health/language';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] language')
@Controller('app-health/languages/create')
export class AppHealthCreateLanguagesController
{
    constructor(
        private readonly handler: AppHealthCreateLanguagesHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create languages in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [AppHealthLanguageDto]})
    @ApiBody({ type: [AppHealthCreateLanguageDto]})
    async main(
        @Body() payload: AppHealthCreateLanguageDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

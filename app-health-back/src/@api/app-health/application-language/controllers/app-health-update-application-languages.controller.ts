/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationLanguageDto, AppHealthUpdateApplicationLanguagesDto, AppHealthUpdateApplicationLanguagesHandler } from '@api/app-health/application-language';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-language')
@Controller('app-health/application-languages/update')
export class AppHealthUpdateApplicationLanguagesController
{
    constructor(
        private readonly handler: AppHealthUpdateApplicationLanguagesHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update application-languages' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AppHealthApplicationLanguageDto })
    async main(
        @Body() payload: AppHealthUpdateApplicationLanguagesDto,
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

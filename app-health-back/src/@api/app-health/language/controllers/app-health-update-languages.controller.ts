/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthLanguageDto, AppHealthUpdateLanguagesDto, AppHealthUpdateLanguagesHandler } from '@api/app-health/language';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] language')
@Controller('app-health/languages/update')
export class AppHealthUpdateLanguagesController
{
    constructor(
        private readonly handler: AppHealthUpdateLanguagesHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update languages' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AppHealthLanguageDto })
    async main(
        @Body() payload: AppHealthUpdateLanguagesDto,
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

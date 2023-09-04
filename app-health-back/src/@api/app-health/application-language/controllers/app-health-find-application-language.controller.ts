/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationLanguageDto, AppHealthFindApplicationLanguageHandler } from '@api/app-health/application-language';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-language')
@Controller('app-health/application-language/find')
export class AppHealthFindApplicationLanguageController
{
    constructor(
        private readonly handler: AppHealthFindApplicationLanguageHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find application-language according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: AppHealthApplicationLanguageDto })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}

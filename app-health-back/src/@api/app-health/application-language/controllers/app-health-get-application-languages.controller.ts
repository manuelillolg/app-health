/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationLanguageDto, AppHealthGetApplicationLanguagesHandler } from '@api/app-health/application-language';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-language')
@Controller('app-health/application-languages/get')
export class AppHealthGetApplicationLanguagesController
{
    constructor(
        private readonly handler: AppHealthGetApplicationLanguagesHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get application-languages according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [AppHealthApplicationLanguageDto]})
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

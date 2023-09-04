/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthGetLanguagesHandler, AppHealthLanguageDto } from '@api/app-health/language';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] language')
@Controller('app-health/languages/get')
export class AppHealthGetLanguagesController
{
    constructor(
        private readonly handler: AppHealthGetLanguagesHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get languages according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [AppHealthLanguageDto]})
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

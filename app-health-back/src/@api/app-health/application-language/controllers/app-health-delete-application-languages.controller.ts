/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationLanguageDto, AppHealthDeleteApplicationLanguagesHandler } from '@api/app-health/application-language';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-language')
@Controller('app-health/application-languages/delete')
export class AppHealthDeleteApplicationLanguagesController
{
    constructor(
        private readonly handler: AppHealthDeleteApplicationLanguagesHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete application-languages in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [AppHealthApplicationLanguageDto]})
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

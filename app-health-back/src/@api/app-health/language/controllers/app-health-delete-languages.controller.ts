/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthDeleteLanguagesHandler, AppHealthLanguageDto } from '@api/app-health/language';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] language')
@Controller('app-health/languages/delete')
export class AppHealthDeleteLanguagesController
{
    constructor(
        private readonly handler: AppHealthDeleteLanguagesHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete languages in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [AppHealthLanguageDto]})
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

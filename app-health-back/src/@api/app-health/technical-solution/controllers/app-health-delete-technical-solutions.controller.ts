/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthDeleteTechnicalSolutionsHandler, AppHealthTechnicalSolutionDto } from '@api/app-health/technical-solution';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] technical-solution')
@Controller('app-health/technical-solutions/delete')
export class AppHealthDeleteTechnicalSolutionsController
{
    constructor(
        private readonly handler: AppHealthDeleteTechnicalSolutionsHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete technical-solutions in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [AppHealthTechnicalSolutionDto]})
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

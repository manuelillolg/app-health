/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthAuthenticationInterfaceDto, AppHealthDeleteAuthenticationInterfacesHandler } from '@api/app-health/authentication-interface';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] authentication-interface')
@Controller('app-health/authentication-interfaces/delete')
export class AppHealthDeleteAuthenticationInterfacesController
{
    constructor(
        private readonly handler: AppHealthDeleteAuthenticationInterfacesHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete authentication-interfaces in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [AppHealthAuthenticationInterfaceDto]})
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

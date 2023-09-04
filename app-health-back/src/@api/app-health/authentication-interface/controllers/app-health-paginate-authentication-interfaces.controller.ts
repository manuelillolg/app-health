/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthPaginateAuthenticationInterfacesHandler } from '@api/app-health/authentication-interface';
import { Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] authentication-interface')
@Controller('app-health/authentication-interfaces/paginate')
export class AppHealthPaginateAuthenticationInterfacesController
{
    constructor(
        private readonly handler: AppHealthPaginateAuthenticationInterfacesHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Paginate authentication-interfaces' })
    @ApiOkResponse({ description: 'The records has been paginated successfully.', type: Pagination })
    @ApiQuery({ name: 'queryStatement', type: QueryStatement })
    @ApiQuery({ name: 'constraint', type: QueryStatement })
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

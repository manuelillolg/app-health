/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApiInterfaceTypeDto, AppHealthFindApiInterfaceTypeHandler } from '@api/app-health/api-interface-type';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] api-interface-type')
@Controller('app-health/api-interface-type/find')
export class AppHealthFindApiInterfaceTypeController
{
    constructor(
        private readonly handler: AppHealthFindApiInterfaceTypeHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find api-interface-type according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: AppHealthApiInterfaceTypeDto })
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

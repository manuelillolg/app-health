/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthAuthorizationInterfaceDto, AppHealthGetAuthorizationInterfacesHandler } from '@api/app-health/authorization-interface';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] authorization-interface')
@Controller('app-health/authorization-interfaces/get')
export class AppHealthGetAuthorizationInterfacesController
{
    constructor(
        private readonly handler: AppHealthGetAuthorizationInterfacesHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get authorization-interfaces according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [AppHealthAuthorizationInterfaceDto]})
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

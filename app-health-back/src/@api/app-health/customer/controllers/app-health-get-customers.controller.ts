/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthCustomerDto, AppHealthGetCustomersHandler } from '@api/app-health/customer';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] customer')
@Controller('app-health/customers/get')
export class AppHealthGetCustomersController
{
    constructor(
        private readonly handler: AppHealthGetCustomersHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get customers according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [AppHealthCustomerDto]})
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

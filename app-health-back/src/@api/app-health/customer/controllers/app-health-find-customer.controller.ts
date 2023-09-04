/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthCustomerDto, AppHealthFindCustomerHandler } from '@api/app-health/customer';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] customer')
@Controller('app-health/customer/find')
export class AppHealthFindCustomerController
{
    constructor(
        private readonly handler: AppHealthFindCustomerHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find customer according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: AppHealthCustomerDto })
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

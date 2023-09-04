/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthCustomerDto, AppHealthFindCustomerByIdHandler } from '@api/app-health/customer';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] customer')
@Controller('app-health/customer/find')
export class AppHealthFindCustomerByIdController
{
    constructor(
        private readonly handler: AppHealthFindCustomerByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find customer by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: AppHealthCustomerDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}

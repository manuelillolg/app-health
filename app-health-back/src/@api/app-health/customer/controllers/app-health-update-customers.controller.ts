/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthCustomerDto, AppHealthUpdateCustomersDto, AppHealthUpdateCustomersHandler } from '@api/app-health/customer';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] customer')
@Controller('app-health/customers/update')
export class AppHealthUpdateCustomersController
{
    constructor(
        private readonly handler: AppHealthUpdateCustomersHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update customers' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AppHealthCustomerDto })
    async main(
        @Body() payload: AppHealthUpdateCustomersDto,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}

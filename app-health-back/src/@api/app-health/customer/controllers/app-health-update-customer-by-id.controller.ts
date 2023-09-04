/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthCustomerDto, AppHealthUpdateCustomerByIdDto, AppHealthUpdateCustomerByIdHandler } from '@api/app-health/customer';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] customer')
@Controller('app-health/customer/update')
export class AppHealthUpdateCustomerByIdController
{
    constructor(
        private readonly handler: AppHealthUpdateCustomerByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update customer by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AppHealthCustomerDto })
    async main(
        @Body() payload: AppHealthUpdateCustomerByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}

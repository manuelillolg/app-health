/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthCustomerDto, AppHealthDeleteCustomerByIdHandler } from '@api/app-health/customer';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] customer')
@Controller('app-health/customer/delete')
export class AppHealthDeleteCustomerByIdController
{
    constructor(
        private readonly handler: AppHealthDeleteCustomerByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete customer by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: AppHealthCustomerDto })
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

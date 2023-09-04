/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthCreateCustomerDto, AppHealthCreateCustomersHandler, AppHealthCustomerDto } from '@api/app-health/customer';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] customer')
@Controller('app-health/customers/create')
export class AppHealthCreateCustomersController
{
    constructor(
        private readonly handler: AppHealthCreateCustomersHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create customers in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [AppHealthCustomerDto]})
    @ApiBody({ type: [AppHealthCreateCustomerDto]})
    async main(
        @Body() payload: AppHealthCreateCustomerDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

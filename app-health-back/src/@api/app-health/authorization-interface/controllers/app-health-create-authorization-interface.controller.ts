/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthAuthorizationInterfaceDto, AppHealthCreateAuthorizationInterfaceDto, AppHealthCreateAuthorizationInterfaceHandler } from '@api/app-health/authorization-interface';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] authorization-interface')
@Controller('app-health/authorization-interface/create')
export class AppHealthCreateAuthorizationInterfaceController
{
    constructor(
        private readonly handler: AppHealthCreateAuthorizationInterfaceHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create authorization-interface' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: AppHealthAuthorizationInterfaceDto })
    async main(
        @Body() payload: AppHealthCreateAuthorizationInterfaceDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

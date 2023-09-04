/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthAuthenticationInterfaceDto, AppHealthCreateAuthenticationInterfaceDto, AppHealthCreateAuthenticationInterfaceHandler } from '@api/app-health/authentication-interface';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] authentication-interface')
@Controller('app-health/authentication-interface/create')
export class AppHealthCreateAuthenticationInterfaceController
{
    constructor(
        private readonly handler: AppHealthCreateAuthenticationInterfaceHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create authentication-interface' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: AppHealthAuthenticationInterfaceDto })
    async main(
        @Body() payload: AppHealthCreateAuthenticationInterfaceDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

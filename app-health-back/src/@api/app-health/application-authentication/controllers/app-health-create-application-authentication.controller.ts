/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationAuthenticationDto, AppHealthCreateApplicationAuthenticationDto, AppHealthCreateApplicationAuthenticationHandler } from '@api/app-health/application-authentication';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-authentication')
@Controller('app-health/application-authentication/create')
export class AppHealthCreateApplicationAuthenticationController
{
    constructor(
        private readonly handler: AppHealthCreateApplicationAuthenticationHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create application-authentication' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: AppHealthApplicationAuthenticationDto })
    async main(
        @Body() payload: AppHealthCreateApplicationAuthenticationDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationAuthorizationDto, AppHealthCreateApplicationAuthorizationDto, AppHealthCreateApplicationAuthorizationHandler } from '@api/app-health/application-authorization';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-authorization')
@Controller('app-health/application-authorization/create')
export class AppHealthCreateApplicationAuthorizationController
{
    constructor(
        private readonly handler: AppHealthCreateApplicationAuthorizationHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create application-authorization' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: AppHealthApplicationAuthorizationDto })
    async main(
        @Body() payload: AppHealthCreateApplicationAuthorizationDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

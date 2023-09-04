/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationAuthenticationDto, AppHealthUpdateApplicationAuthenticationByIdDto, AppHealthUpsertApplicationAuthenticationHandler } from '@api/app-health/application-authentication';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-authentication')
@Controller('app-health/application-authentication/upsert')
export class AppHealthUpsertApplicationAuthenticationController
{
    constructor(
        private readonly handler: AppHealthUpsertApplicationAuthenticationHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert application-authentication' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: AppHealthApplicationAuthenticationDto })
    async main(
        @Body() payload: AppHealthUpdateApplicationAuthenticationByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

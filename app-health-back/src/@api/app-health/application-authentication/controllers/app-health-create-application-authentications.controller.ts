/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationAuthenticationDto, AppHealthCreateApplicationAuthenticationDto, AppHealthCreateApplicationAuthenticationsHandler } from '@api/app-health/application-authentication';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-authentication')
@Controller('app-health/application-authentications/create')
export class AppHealthCreateApplicationAuthenticationsController
{
    constructor(
        private readonly handler: AppHealthCreateApplicationAuthenticationsHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create application-authentications in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [AppHealthApplicationAuthenticationDto]})
    @ApiBody({ type: [AppHealthCreateApplicationAuthenticationDto]})
    async main(
        @Body() payload: AppHealthCreateApplicationAuthenticationDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

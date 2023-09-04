/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationAuthorizationDto, AppHealthCreateApplicationAuthorizationDto, AppHealthCreateApplicationAuthorizationsHandler } from '@api/app-health/application-authorization';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-authorization')
@Controller('app-health/application-authorizations/create')
export class AppHealthCreateApplicationAuthorizationsController
{
    constructor(
        private readonly handler: AppHealthCreateApplicationAuthorizationsHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create application-authorizations in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [AppHealthApplicationAuthorizationDto]})
    @ApiBody({ type: [AppHealthCreateApplicationAuthorizationDto]})
    async main(
        @Body() payload: AppHealthCreateApplicationAuthorizationDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

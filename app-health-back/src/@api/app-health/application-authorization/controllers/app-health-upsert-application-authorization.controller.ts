/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationAuthorizationDto, AppHealthUpdateApplicationAuthorizationByIdDto, AppHealthUpsertApplicationAuthorizationHandler } from '@api/app-health/application-authorization';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-authorization')
@Controller('app-health/application-authorization/upsert')
export class AppHealthUpsertApplicationAuthorizationController
{
    constructor(
        private readonly handler: AppHealthUpsertApplicationAuthorizationHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert application-authorization' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: AppHealthApplicationAuthorizationDto })
    async main(
        @Body() payload: AppHealthUpdateApplicationAuthorizationByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

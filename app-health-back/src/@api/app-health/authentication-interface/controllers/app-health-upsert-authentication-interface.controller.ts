/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthAuthenticationInterfaceDto, AppHealthUpdateAuthenticationInterfaceByIdDto, AppHealthUpsertAuthenticationInterfaceHandler } from '@api/app-health/authentication-interface';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] authentication-interface')
@Controller('app-health/authentication-interface/upsert')
export class AppHealthUpsertAuthenticationInterfaceController
{
    constructor(
        private readonly handler: AppHealthUpsertAuthenticationInterfaceHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert authentication-interface' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: AppHealthAuthenticationInterfaceDto })
    async main(
        @Body() payload: AppHealthUpdateAuthenticationInterfaceByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

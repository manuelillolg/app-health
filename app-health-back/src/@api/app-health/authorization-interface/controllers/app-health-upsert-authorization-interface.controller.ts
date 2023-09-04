/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthAuthorizationInterfaceDto, AppHealthUpdateAuthorizationInterfaceByIdDto, AppHealthUpsertAuthorizationInterfaceHandler } from '@api/app-health/authorization-interface';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] authorization-interface')
@Controller('app-health/authorization-interface/upsert')
export class AppHealthUpsertAuthorizationInterfaceController
{
    constructor(
        private readonly handler: AppHealthUpsertAuthorizationInterfaceHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert authorization-interface' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: AppHealthAuthorizationInterfaceDto })
    async main(
        @Body() payload: AppHealthUpdateAuthorizationInterfaceByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

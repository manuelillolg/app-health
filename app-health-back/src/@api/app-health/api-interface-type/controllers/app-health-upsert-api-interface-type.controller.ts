/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApiInterfaceTypeDto, AppHealthUpdateApiInterfaceTypeByIdDto, AppHealthUpsertApiInterfaceTypeHandler } from '@api/app-health/api-interface-type';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] api-interface-type')
@Controller('app-health/api-interface-type/upsert')
export class AppHealthUpsertApiInterfaceTypeController
{
    constructor(
        private readonly handler: AppHealthUpsertApiInterfaceTypeHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert api-interface-type' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: AppHealthApiInterfaceTypeDto })
    async main(
        @Body() payload: AppHealthUpdateApiInterfaceTypeByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

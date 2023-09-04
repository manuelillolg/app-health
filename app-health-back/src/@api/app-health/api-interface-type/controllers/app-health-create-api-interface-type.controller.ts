/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApiInterfaceTypeDto, AppHealthCreateApiInterfaceTypeDto, AppHealthCreateApiInterfaceTypeHandler } from '@api/app-health/api-interface-type';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] api-interface-type')
@Controller('app-health/api-interface-type/create')
export class AppHealthCreateApiInterfaceTypeController
{
    constructor(
        private readonly handler: AppHealthCreateApiInterfaceTypeHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create api-interface-type' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: AppHealthApiInterfaceTypeDto })
    async main(
        @Body() payload: AppHealthCreateApiInterfaceTypeDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

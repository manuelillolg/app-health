/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApiInterfaceTypeDto, AppHealthCreateApiInterfaceTypeDto, AppHealthCreateApiInterfaceTypesHandler } from '@api/app-health/api-interface-type';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] api-interface-type')
@Controller('app-health/api-interface-types/create')
export class AppHealthCreateApiInterfaceTypesController
{
    constructor(
        private readonly handler: AppHealthCreateApiInterfaceTypesHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create api-interface-types in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [AppHealthApiInterfaceTypeDto]})
    @ApiBody({ type: [AppHealthCreateApiInterfaceTypeDto]})
    async main(
        @Body() payload: AppHealthCreateApiInterfaceTypeDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthAuthorizationInterfaceDto, AppHealthCreateAuthorizationInterfaceDto, AppHealthCreateAuthorizationInterfacesHandler } from '@api/app-health/authorization-interface';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] authorization-interface')
@Controller('app-health/authorization-interfaces/create')
export class AppHealthCreateAuthorizationInterfacesController
{
    constructor(
        private readonly handler: AppHealthCreateAuthorizationInterfacesHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create authorization-interfaces in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [AppHealthAuthorizationInterfaceDto]})
    @ApiBody({ type: [AppHealthCreateAuthorizationInterfaceDto]})
    async main(
        @Body() payload: AppHealthCreateAuthorizationInterfaceDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

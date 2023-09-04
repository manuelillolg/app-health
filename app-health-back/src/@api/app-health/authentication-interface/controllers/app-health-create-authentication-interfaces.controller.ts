/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthAuthenticationInterfaceDto, AppHealthCreateAuthenticationInterfaceDto, AppHealthCreateAuthenticationInterfacesHandler } from '@api/app-health/authentication-interface';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] authentication-interface')
@Controller('app-health/authentication-interfaces/create')
export class AppHealthCreateAuthenticationInterfacesController
{
    constructor(
        private readonly handler: AppHealthCreateAuthenticationInterfacesHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create authentication-interfaces in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [AppHealthAuthenticationInterfaceDto]})
    @ApiBody({ type: [AppHealthCreateAuthenticationInterfaceDto]})
    async main(
        @Body() payload: AppHealthCreateAuthenticationInterfaceDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}

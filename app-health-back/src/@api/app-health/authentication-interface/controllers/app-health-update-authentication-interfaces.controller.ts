/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthAuthenticationInterfaceDto, AppHealthUpdateAuthenticationInterfacesDto, AppHealthUpdateAuthenticationInterfacesHandler } from '@api/app-health/authentication-interface';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] authentication-interface')
@Controller('app-health/authentication-interfaces/update')
export class AppHealthUpdateAuthenticationInterfacesController
{
    constructor(
        private readonly handler: AppHealthUpdateAuthenticationInterfacesHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update authentication-interfaces' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AppHealthAuthenticationInterfaceDto })
    async main(
        @Body() payload: AppHealthUpdateAuthenticationInterfacesDto,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthAuthorizationInterfaceDto, AppHealthUpdateAuthorizationInterfacesDto, AppHealthUpdateAuthorizationInterfacesHandler } from '@api/app-health/authorization-interface';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] authorization-interface')
@Controller('app-health/authorization-interfaces/update')
export class AppHealthUpdateAuthorizationInterfacesController
{
    constructor(
        private readonly handler: AppHealthUpdateAuthorizationInterfacesHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update authorization-interfaces' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AppHealthAuthorizationInterfaceDto })
    async main(
        @Body() payload: AppHealthUpdateAuthorizationInterfacesDto,
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

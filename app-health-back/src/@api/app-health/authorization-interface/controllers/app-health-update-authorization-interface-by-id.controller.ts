/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthAuthorizationInterfaceDto, AppHealthUpdateAuthorizationInterfaceByIdDto, AppHealthUpdateAuthorizationInterfaceByIdHandler } from '@api/app-health/authorization-interface';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] authorization-interface')
@Controller('app-health/authorization-interface/update')
export class AppHealthUpdateAuthorizationInterfaceByIdController
{
    constructor(
        private readonly handler: AppHealthUpdateAuthorizationInterfaceByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update authorization-interface by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AppHealthAuthorizationInterfaceDto })
    async main(
        @Body() payload: AppHealthUpdateAuthorizationInterfaceByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}

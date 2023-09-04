/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthAuthorizationInterfaceDto, AppHealthDeleteAuthorizationInterfaceByIdHandler } from '@api/app-health/authorization-interface';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] authorization-interface')
@Controller('app-health/authorization-interface/delete')
export class AppHealthDeleteAuthorizationInterfaceByIdController
{
    constructor(
        private readonly handler: AppHealthDeleteAuthorizationInterfaceByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete authorization-interface by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: AppHealthAuthorizationInterfaceDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}

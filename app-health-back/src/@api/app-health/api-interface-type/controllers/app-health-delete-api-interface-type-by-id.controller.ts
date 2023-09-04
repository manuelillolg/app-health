/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApiInterfaceTypeDto, AppHealthDeleteApiInterfaceTypeByIdHandler } from '@api/app-health/api-interface-type';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] api-interface-type')
@Controller('app-health/api-interface-type/delete')
export class AppHealthDeleteApiInterfaceTypeByIdController
{
    constructor(
        private readonly handler: AppHealthDeleteApiInterfaceTypeByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete api-interface-type by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: AppHealthApiInterfaceTypeDto })
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

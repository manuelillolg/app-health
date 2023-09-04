/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApiInterfaceTypeDto, AppHealthUpdateApiInterfaceTypesDto, AppHealthUpdateApiInterfaceTypesHandler } from '@api/app-health/api-interface-type';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] api-interface-type')
@Controller('app-health/api-interface-types/update')
export class AppHealthUpdateApiInterfaceTypesController
{
    constructor(
        private readonly handler: AppHealthUpdateApiInterfaceTypesHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update api-interface-types' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AppHealthApiInterfaceTypeDto })
    async main(
        @Body() payload: AppHealthUpdateApiInterfaceTypesDto,
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

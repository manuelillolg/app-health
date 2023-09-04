/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthTechnicalSolutionDto, AppHealthUpdateTechnicalSolutionByIdDto, AppHealthUpdateTechnicalSolutionByIdHandler } from '@api/app-health/technical-solution';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] technical-solution')
@Controller('app-health/technical-solution/update')
export class AppHealthUpdateTechnicalSolutionByIdController
{
    constructor(
        private readonly handler: AppHealthUpdateTechnicalSolutionByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update technical-solution by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AppHealthTechnicalSolutionDto })
    async main(
        @Body() payload: AppHealthUpdateTechnicalSolutionByIdDto,
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

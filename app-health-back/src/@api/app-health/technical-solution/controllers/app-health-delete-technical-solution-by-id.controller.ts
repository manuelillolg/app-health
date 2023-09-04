/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthDeleteTechnicalSolutionByIdHandler, AppHealthTechnicalSolutionDto } from '@api/app-health/technical-solution';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] technical-solution')
@Controller('app-health/technical-solution/delete')
export class AppHealthDeleteTechnicalSolutionByIdController
{
    constructor(
        private readonly handler: AppHealthDeleteTechnicalSolutionByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete technical-solution by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: AppHealthTechnicalSolutionDto })
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

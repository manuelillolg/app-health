/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class AppHealthUpdateTechnicalSolutionsDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id?: string;

    @ApiProperty({
        type       : String,
        description: 'customerId [input here api field description]',
        example    : '1f415d5e-7700-52c8-8527-b12db6d9943a',
    })
    customerId?: string;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
    })
    name?: string;

    @ApiProperty({
        type       : String,
        description: 'description [input here api field description]',
    })
    description?: string;

    @ApiProperty({
        type       : String,
        description: 'architectureDiagram [input here api field description]',
    })
    architectureDiagram?: string;

    @ApiProperty({
        type       : String,
        description: 'proposal [input here api field description]',
    })
    proposal?: string;

}

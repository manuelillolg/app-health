/* eslint-disable indent */
import { AppHealthCustomerDto } from '@api/app-health/customer';
import { ApiProperty } from '@nestjs/swagger';

export class AppHealthTechnicalSolutionDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'customerId [input here api field description]',
        example    : '1f415d5e-7700-52c8-8527-b12db6d9943a',
    })
    customerId: string;

    @ApiProperty({
        type       : () => AppHealthCustomerDto,
        description: 'AppHealthCustomer [input here api field description]',
    })
    customer?: AppHealthCustomerDto;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
    })
    name: string;

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

    @ApiProperty({
        type       : String,
        description: 'createdAt [input here api field description]',
    })
    createdAt?: string;

    @ApiProperty({
        type       : String,
        description: 'updatedAt [input here api field description]',
    })
    updatedAt?: string;

    @ApiProperty({
        type       : String,
        description: 'deletedAt [input here api field description]',
    })
    deletedAt?: string;

}

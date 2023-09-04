/* eslint-disable indent */
import { AppHealthInfrastructureProviderDto } from '@api/app-health/infrastructure-provider';
import { ApiProperty } from '@nestjs/swagger';

export class AppHealthInfrastructureServiceDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'providerId [input here api field description]',
        example    : '385a973c-32a8-58b1-825b-ccf5ee1e5c65',
    })
    providerId: string;

    @ApiProperty({
        type       : () => AppHealthInfrastructureProviderDto,
        description: 'AppHealthInfrastructureProvider [input here api field description]',
    })
    provider?: AppHealthInfrastructureProviderDto;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
    })
    name: string;

    @ApiProperty({
        type       : Number,
        description: 'score [input here api field description]',
    })
    score: number;

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

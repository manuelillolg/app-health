/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class AppHealthCreateApplicationAuthenticationDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'applicationId [input here api field description]',
        example    : '209e8dce-ce93-5b3d-a4f3-06ce49207393',
    })
    applicationId: string;

    @ApiProperty({
        type       : String,
        description: 'authenticationInterfaceId [input here api field description]',
        example    : '744828e4-620e-56ee-a497-49ffa21a21fa',
    })
    authenticationInterfaceId: string;

    @ApiProperty({
        type       : Number,
        description: 'totalUsers [input here api field description]',
    })
    totalUsers?: number;

    @ApiProperty({
        type       : Number,
        description: 'score [input here api field description]',
    })
    score: number;

    @ApiProperty({
        type       : String,
        description: 'applicationInfrastructureServiceId [input here api field description]',
        example    : '4500f7d8-50e3-58a0-8426-7e7b78402710',
    })
    applicationInfrastructureServiceId: string;

}

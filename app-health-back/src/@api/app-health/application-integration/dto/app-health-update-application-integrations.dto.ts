/* eslint-disable indent */
import { AppHealthApplicationIntegrationModality } from '@api/graphql';
import { ApiProperty } from '@nestjs/swagger';

export class AppHealthUpdateApplicationIntegrationsDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id?: string;

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
        description: 'sourceApplicationId [input here api field description]',
        example    : '2f807075-093e-5437-bebf-3d0d7bbd5bb5',
    })
    sourceApplicationId?: string;

    @ApiProperty({
        type       : String,
        description: 'targetApplicationId [input here api field description]',
        example    : 'b9a07f6b-db80-58a4-85f8-ac3876029381',
    })
    targetApplicationId?: string;

    @ApiProperty({
        type       : String,
        description: 'apiInterfaceTypeId [input here api field description]',
        example    : '8b85608c-92e7-5a04-852e-5efe2826a905',
    })
    apiInterfaceTypeId?: string;

    @ApiProperty({
        type       : Number,
        description: 'interfaceNumbers [input here api field description]',
    })
    interfaceNumbers?: number;

    @ApiProperty({
        type       : AppHealthApplicationIntegrationModality,
        enum       : ['UNIDIRECTIONAL','BIDIRECTIONAL'],
        description: 'modality [input here api field description]',
    })
    modality?: AppHealthApplicationIntegrationModality;

    @ApiProperty({
        type       : Number,
        description: 'score [input here api field description]',
    })
    score?: number;

    @ApiProperty({
        type       : Object,
        description: 'documentations [input here api field description]',
    })
    documentations?: any;

}

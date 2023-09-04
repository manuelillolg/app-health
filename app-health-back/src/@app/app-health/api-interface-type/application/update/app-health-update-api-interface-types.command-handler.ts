/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpdateApiInterfaceTypesCommand } from './app-health-update-api-interface-types.command';
import { AppHealthUpdateApiInterfaceTypesService } from './app-health-update-api-interface-types.service';
import {
    AppHealthApiInterfaceTypeId,
    AppHealthApiInterfaceTypeName,
    AppHealthApiInterfaceTypeScore,
    AppHealthApiInterfaceTypeCreatedAt,
    AppHealthApiInterfaceTypeUpdatedAt,
    AppHealthApiInterfaceTypeDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthUpdateApiInterfaceTypesCommand)
export class AppHealthUpdateApiInterfaceTypesCommandHandler implements ICommandHandler<AppHealthUpdateApiInterfaceTypesCommand>
{
    constructor(
        private readonly updateApiInterfaceTypesService: AppHealthUpdateApiInterfaceTypesService,
    ) {}

    async execute(command: AppHealthUpdateApiInterfaceTypesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateApiInterfaceTypesService.main(
            {
                id: new AppHealthApiInterfaceTypeId(command.payload.id, { undefinable: true }),
                name: new AppHealthApiInterfaceTypeName(command.payload.name, { undefinable: true }),
                score: new AppHealthApiInterfaceTypeScore(command.payload.score, { undefinable: true }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}

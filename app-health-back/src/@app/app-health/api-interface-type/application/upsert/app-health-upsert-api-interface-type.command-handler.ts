/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpsertApiInterfaceTypeCommand } from './app-health-upsert-api-interface-type.command';
import { AppHealthUpsertApiInterfaceTypeService } from './app-health-upsert-api-interface-type.service';
import {
    AppHealthApiInterfaceTypeId,
    AppHealthApiInterfaceTypeName,
    AppHealthApiInterfaceTypeScore,
    AppHealthApiInterfaceTypeCreatedAt,
    AppHealthApiInterfaceTypeUpdatedAt,
    AppHealthApiInterfaceTypeDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthUpsertApiInterfaceTypeCommand)
export class AppHealthUpsertApiInterfaceTypeCommandHandler implements ICommandHandler<AppHealthUpsertApiInterfaceTypeCommand>
{
    constructor(
        private readonly upsertApiInterfaceTypeService: AppHealthUpsertApiInterfaceTypeService,
    ) {}

    async execute(command: AppHealthUpsertApiInterfaceTypeCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertApiInterfaceTypeService.main(
            {
                id: new AppHealthApiInterfaceTypeId(command.payload.id),
                name: new AppHealthApiInterfaceTypeName(command.payload.name),
                score: new AppHealthApiInterfaceTypeScore(command.payload.score),
            },
            command.cQMetadata,
        );
    }
}

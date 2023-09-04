/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpsertCustomerCommand } from './app-health-upsert-customer.command';
import { AppHealthUpsertCustomerService } from './app-health-upsert-customer.service';
import {
    AppHealthCustomerId,
    AppHealthCustomerName,
    AppHealthCustomerCreatedAt,
    AppHealthCustomerUpdatedAt,
    AppHealthCustomerDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthUpsertCustomerCommand)
export class AppHealthUpsertCustomerCommandHandler implements ICommandHandler<AppHealthUpsertCustomerCommand>
{
    constructor(
        private readonly upsertCustomerService: AppHealthUpsertCustomerService,
    ) {}

    async execute(command: AppHealthUpsertCustomerCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertCustomerService.main(
            {
                id: new AppHealthCustomerId(command.payload.id),
                name: new AppHealthCustomerName(command.payload.name),
            },
            command.cQMetadata,
        );
    }
}

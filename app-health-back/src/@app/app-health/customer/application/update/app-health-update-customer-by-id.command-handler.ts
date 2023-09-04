/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpdateCustomerByIdCommand } from './app-health-update-customer-by-id.command';
import { AppHealthUpdateCustomerByIdService } from './app-health-update-customer-by-id.service';
import {
    AppHealthCustomerId,
    AppHealthCustomerName,
    AppHealthCustomerCreatedAt,
    AppHealthCustomerUpdatedAt,
    AppHealthCustomerDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthUpdateCustomerByIdCommand)
export class AppHealthUpdateCustomerByIdCommandHandler implements ICommandHandler<AppHealthUpdateCustomerByIdCommand>
{
    constructor(
        private readonly updateCustomerByIdService: AppHealthUpdateCustomerByIdService,
    ) {}

    async execute(command: AppHealthUpdateCustomerByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateCustomerByIdService.main(
            {
                id: new AppHealthCustomerId(command.payload.id),
                name: new AppHealthCustomerName(command.payload.name, { undefinable: true }),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}

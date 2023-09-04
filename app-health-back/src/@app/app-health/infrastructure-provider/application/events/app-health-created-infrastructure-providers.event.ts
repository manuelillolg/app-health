import { AppHealthCreatedInfrastructureProviderEvent } from './app-health-created-infrastructure-provider.event';

export class AppHealthCreatedInfrastructureProvidersEvent
{
    constructor(
        public readonly infrastructureProviders: AppHealthCreatedInfrastructureProviderEvent[],
    ) {}
}

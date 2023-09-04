import { AppHealthDeletedInfrastructureProviderEvent } from './app-health-deleted-infrastructure-provider.event';

export class AppHealthDeletedInfrastructureProvidersEvent
{
    constructor(
        public readonly infrastructureProviders: AppHealthDeletedInfrastructureProviderEvent[],
    ) {}
}

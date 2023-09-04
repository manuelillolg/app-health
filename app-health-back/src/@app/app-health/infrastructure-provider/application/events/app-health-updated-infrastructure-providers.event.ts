import { AppHealthUpdatedInfrastructureProviderEvent } from './app-health-updated-infrastructure-provider.event';

export class AppHealthUpdatedInfrastructureProvidersEvent
{
    constructor(
        public readonly infrastructureProviders: AppHealthUpdatedInfrastructureProviderEvent[],
    ) {}
}

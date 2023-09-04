import { AppHealthDeletedApplicationIntegrationEvent } from './app-health-deleted-application-integration.event';

export class AppHealthDeletedApplicationIntegrationsEvent
{
    constructor(
        public readonly applicationIntegrations: AppHealthDeletedApplicationIntegrationEvent[],
    ) {}
}

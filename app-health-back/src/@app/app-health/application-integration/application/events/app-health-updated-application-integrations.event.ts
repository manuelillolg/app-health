import { AppHealthUpdatedApplicationIntegrationEvent } from './app-health-updated-application-integration.event';

export class AppHealthUpdatedApplicationIntegrationsEvent
{
    constructor(
        public readonly applicationIntegrations: AppHealthUpdatedApplicationIntegrationEvent[],
    ) {}
}

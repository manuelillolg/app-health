import { AppHealthApplicationResponse } from '@app/app-health/application';

export class AppHealthApplicationViewResponse
{
    constructor(
        public readonly id: string,
        public readonly applicationId: string,
        public readonly totalViews: number,
        public readonly complexity: string,
        public readonly description: number,
        public readonly score: number,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        public readonly application: AppHealthApplicationResponse,
    ) {}
}

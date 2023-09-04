export class AppHealthUpdatedTechnicalSolutionEvent
{
    constructor(
        public readonly id: string,
        public readonly customerId: string,
        public readonly name: string,
        public readonly description: string,
        public readonly architectureDiagram: string,
        public readonly proposal: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}

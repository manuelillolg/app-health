export class AppHealthDeletedDatabaseEvent
{
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly type: string,
        public readonly versions: any,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}

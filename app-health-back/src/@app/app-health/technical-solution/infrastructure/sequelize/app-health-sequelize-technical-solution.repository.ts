import { AppHealthITechnicalSolutionRepository, AppHealthTechnicalSolution, AppHealthTechnicalSolutionMapper, AppHealthTechnicalSolutionModel } from '@app/app-health/technical-solution';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AppHealthSequelizeTechnicalSolutionRepository extends SequelizeRepository<AppHealthTechnicalSolution, AppHealthTechnicalSolutionModel> implements AppHealthITechnicalSolutionRepository
{
    public readonly aggregateName: string = 'AppHealthTechnicalSolution';
    public readonly mapper: AppHealthTechnicalSolutionMapper = new AppHealthTechnicalSolutionMapper();

    constructor(
        @InjectModel(AppHealthTechnicalSolutionModel)
        public readonly repository: typeof AppHealthTechnicalSolutionModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}

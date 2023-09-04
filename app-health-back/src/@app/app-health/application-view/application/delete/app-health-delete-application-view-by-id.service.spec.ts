/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockApplicationViewData } from '@app/app-health/application-view/infrastructure/mock/app-health-mock-application-view.data';
import { AppHealthDeleteApplicationViewByIdService } from './app-health-delete-application-view-by-id.service';
import { AppHealthApplicationViewId } from '../../domain/value-objects';
import { AppHealthIApplicationViewRepository } from '../../domain/app-health-application-view.repository';
import { AppHealthMockApplicationViewRepository } from '../../infrastructure/mock/app-health-mock-application-view.repository';

describe('AppHealthDeleteApplicationViewByIdService', () =>
{
    let service: AppHealthDeleteApplicationViewByIdService;
    let repository: AppHealthIApplicationViewRepository;
    let mockRepository: AppHealthMockApplicationViewRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthDeleteApplicationViewByIdService,
                AppHealthMockApplicationViewRepository,
                {
                    provide : AppHealthIApplicationViewRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthDeleteApplicationViewByIdService);
        repository = module.get(AppHealthIApplicationViewRepository);
        mockRepository = module.get(AppHealthMockApplicationViewRepository);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationViewByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete applicationView and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new AppHealthApplicationViewId(appHealthMockApplicationViewData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});

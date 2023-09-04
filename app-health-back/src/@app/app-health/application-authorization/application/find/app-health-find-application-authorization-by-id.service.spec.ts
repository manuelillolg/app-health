import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization/infrastructure/mock/app-health-mock-application-authorization.data';
import { AppHealthFindApplicationAuthorizationByIdService } from './app-health-find-application-authorization-by-id.service';
import { AppHealthApplicationAuthorizationId } from '../../domain/value-objects';
import { AppHealthIApplicationAuthorizationRepository } from '../../domain/app-health-application-authorization.repository';
import { AppHealthMockApplicationAuthorizationRepository } from '../../infrastructure/mock/app-health-mock-application-authorization.repository';

describe('AppHealthFindApplicationAuthorizationByIdService', () =>
{
    let service: AppHealthFindApplicationAuthorizationByIdService;
    let repository: AppHealthIApplicationAuthorizationRepository;
    let mockRepository: AppHealthMockApplicationAuthorizationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthFindApplicationAuthorizationByIdService,
                AppHealthMockApplicationAuthorizationRepository,
                {
                    provide : AppHealthIApplicationAuthorizationRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthFindApplicationAuthorizationByIdService);
        repository = module.get(AppHealthIApplicationAuthorizationRepository);
        mockRepository = module.get(AppHealthMockApplicationAuthorizationRepository);
    });

    describe('main', () =>
    {
        test('FindApplicationAuthorizationByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find applicationAuthorization by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new AppHealthApplicationAuthorizationId(appHealthMockApplicationAuthorizationData[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});

import { FuseNavigationItem } from '@fuse/components/navigation';

export const appHealthNavigation: FuseNavigationItem = {
    id      : 'appHealth',
    title   : 'AppHealth',
    type    : 'collapsable',
    icon    : 'heroicons_outline:tag',
    children: [
        {
            id   : 'apiInterfaceTypes',
            title: 'ApiInterfaceType',
            type : 'basic',
            icon : 'heroicons_outline:tag',
            link : '/app-health/api-interface-type',
        },
    ],
};
import { Dance, Figure, StarContent, StarDanceLevel } from '@core/models';

const MOCK_DANCES: Array<Dance> = [
    { id: '43344', name: 'waltz' },
    { id: '42244', name: 'tango' },
    { id: '43335', name: 'quickstep' },
    { id: '43544', name: 'foxtrot' }
];

const MOCK_FIGURES: Array<Figure> = [
    { id: 'fig1', name: 'figura 1', coverURL: 'https://images.glaciermedia.ca/polopoly_fs/1.23203917.1521219224!/fileImage/httpImage/image.jpg_gen/derivatives/landscape_804/dance-collective1.jpg' },
    { id: 'fig2', name: 'figura 2', coverURL: 'https://images.glaciermedia.ca/polopoly_fs/1.23203917.1521219224!/fileImage/httpImage/image.jpg_gen/derivatives/landscape_804/dance-collective1.jpg' },
];

const MOCK_DANCE_LEVELS_1: Array<StarDanceLevel> = [
    {
        level: 1, figures: [
            {
                number: 1,
                figure: MOCK_FIGURES[0]
            },
            {
                number: 2,
                figure: MOCK_FIGURES[1]
            },
        ]
    },
    {
        level: 2, figures: [
            {
                number: 1,
                figure: MOCK_FIGURES[0]
            },
            {
                number: 2,
                figure: MOCK_FIGURES[1]
            },
        ]
    },
    {
        level: 3, figures: [
            {
                number: 1,
                figure: MOCK_FIGURES[0]
            },
            {
                number: 2,
                figure: MOCK_FIGURES[1]
            },
        ]
    }
];



export const MOCK_STARS_CONTENT: Array<StarContent> = [
    {
        starId: '1',
        dances: [
            { dance: MOCK_DANCES[0], levels: [...MOCK_DANCE_LEVELS_1] },
            { dance: MOCK_DANCES[1], levels: [] },
            { dance: MOCK_DANCES[2], levels: [] }
        ]
    },
    {
        starId: '2',
        dances: []
    },
    {
        starId: '3',
        dances: []
    }
];



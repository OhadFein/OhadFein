import { LabItem } from '@core/models/';

const MOCK_LAB = {
    star: {
        name: {
            firstName: 'Paul',
            lastName: 'Moldovan'
        },
        location: {
            country: 'Romania'
        },
        logo: {
            small: 'https://danskill1.s3-eu-west-1.amazonaws.com/stars/Paul+Moldovan/logo.jpg',
            large: 'https://danskill1.s3-eu-west-1.amazonaws.com/stars/Paul+Moldovan/logo.jpg'
        },
        figures: [
            '5f4101a2f3f8fd3386e9dce0'
        ],
        achievements: [
            '3rd place World cup',
            '3rd place European cup',
            '2x Semi final World champoinship',
            '2x Semi final European championship',
            '2x GOC semi final',
            '5x Latvian champions'
        ],
        _id: '5f40fe6ad1f6082d42e9708b',
        promoVideo: 'https://danskill1.s3-eu-west-1.amazonaws.com/stars/Paul+Moldovan/promo.MP4',
        about: '',
        slug: 'Paul-Moldovan',
        createdAt: '2020-08-22T11:15:54.964Z',
        updatedAt: '2020-08-22T11:29:38.931Z',
        __v: 0
    },
    figure: {
        stars: [
            '5f40fe6ad1f6082d42e9708b'
        ],
        videos: [
            {
                _id: '5f4151336391ed647f4df9c1',
                name: 'Fake it till you make it',
                view: 'front',
                participatesAmount: 'solo',
                associatedObject: '5f4101a2f3f8fd3386e9dce0',
                thumbnail: 'https://danskill1.s3-eu-west-1.amazonaws.com/stars/Paul+Moldovan/Opening+Out/Fake+it+till+you+make+it.png',
                ownerUser: '5f40fc75ac07bc255b09ea4e',
                ownerRole: 99,
                associatedModel: 'Figure',
                key: 'https://danskill1.s3-eu-west-1.amazonaws.com/stars/Paul+Moldovan/Opening+Out/Fake+it+till+you+make+it.MP4',
                type: 'promo',
                createdAt: '2020-08-22T17:09:07.596Z',
                updatedAt: '2020-08-22T17:09:07.596Z',
                __v: 0
            },
            {
                _id: '5f41544fe0ec19692974cf94',
                name: 'Fake it till you make it',
                view: 'front',
                type: 'comparable',
                participatesAmount: 'solo',
                associatedObject: '5f4101a2f3f8fd3386e9dce0',
                thumbnail: 'https://danskill1.s3-eu-west-1.amazonaws.com/stars/Paul+Moldovan/Opening+Out/Fake+it+till+you+make+it.png',
                ownerUser: '5f40fc75ac07bc255b09ea4e',
                ownerRole: 99,
                associatedModel: 'Figure',
                key: 'https://danskill1.s3-eu-west-1.amazonaws.com/stars/Paul+Moldovan/Opening+Out/Fake+it+till+you+make+it.MP4',
                createdAt: '2020-08-22T17:22:23.419Z',
                updatedAt: '2020-08-22T18:35:45.313Z',
                __v: 0
            },
            {
                _id: '5f41549fe0ec19692974cf95',
                name: 'basic principles #1',
                view: 'front',
                type: 'basicPrinciples',
                participatesAmount: 'solo',
                associatedObject: '5f4101a2f3f8fd3386e9dce0',
                thumbnail: 'https://danskill1.s3-eu-west-1.amazonaws.com/stars/Paul+Moldovan/Opening+Out/Fake+it+till+you+make+it.png',
                ownerUser: '5f40fc75ac07bc255b09ea4e',
                ownerRole: 99,
                associatedModel: 'Figure',
                key: 'https://danskill1.s3-eu-west-1.amazonaws.com/stars/Paul+Moldovan/Opening+Out/Master+BASIC.MP4',
                createdAt: '2020-08-22T17:23:43.666Z',
                updatedAt: '2020-08-22T17:23:43.666Z',
                __v: 0
            },
            {
                _id: '5f4154d0e0ec19692974cf96',
                name: 'exercise',
                view: 'front',
                type: 'exercises',
                participatesAmount: 'solo',
                associatedObject: '5f4101a2f3f8fd3386e9dce0',
                thumbnail: 'https://danskill1.s3-eu-west-1.amazonaws.com/stars/Paul+Moldovan/Opening+Out/Fake+it+till+you+make+it.png',
                ownerUser: '5f40fc75ac07bc255b09ea4e',
                ownerRole: 99,
                associatedModel: 'Figure',
                key: 'https://danskill1.s3-eu-west-1.amazonaws.com/stars/Paul+Moldovan/Opening+Out/Master+EXERCISE.MP4',
                createdAt: '2020-08-22T17:24:32.791Z',
                updatedAt: '2020-08-22T17:24:32.791Z',
                __v: 0
            },
            {
                _id: '5f415565e0ec19692974cf97',
                name: 'tips #1',
                view: 'front',
                type: 'tips',
                participatesAmount: 'solo',
                associatedObject: '5f4101a2f3f8fd3386e9dce0',
                thumbnail: 'https://danskill1.s3-eu-west-1.amazonaws.com/stars/Paul+Moldovan/Opening+Out/MASTER+TIP.MP4',
                ownerUser: '5f40fc75ac07bc255b09ea4e',
                ownerRole: 99,
                associatedModel: 'Figure',
                key: 'https://danskill1.s3-eu-west-1.amazonaws.com/stars/Paul+Moldovan/Opening+Out/Master+EXERCISE.MP4',
                createdAt: '2020-08-22T17:27:01.435Z',
                updatedAt: '2020-08-22T17:27:01.435Z',
                __v: 0
            },
            {
                _id: '5f41564ee0ec19692974cf98',
                name: 'Silabus',
                view: 'front',
                type: 'basicPrinciples',
                participatesAmount: 'solo',
                associatedObject: '5f4101a2f3f8fd3386e9dce0',
                thumbnail: 'https://danskill1.s3-eu-west-1.amazonaws.com/stars/Paul+Moldovan/Opening+Out/MASTER+TIP.MP4',
                ownerUser: '5f40fc75ac07bc255b09ea4e',
                ownerRole: 99,
                associatedModel: 'Figure',
                key: 'https://danskill1.s3-eu-west-1.amazonaws.com/stars/Paul+Moldovan/Opening+Out/MASTER+Silabus.MP4',
                createdAt: '2020-08-22T17:30:54.666Z',
                updatedAt: '2020-08-22T17:30:54.666Z',
                __v: 0
            }
        ],
        _id: '5f4101a2f3f8fd3386e9dce0',
        type: 'tango',
        level: '1',
        name: 'Opening Out',
        logo: 'https://danskill1.s3-eu-west-1.amazonaws.com/stars/Paul+Moldovan/Opening+Out/Fake+it+till+you+make+it.png',
        createdAt: '2020-08-22T11:29:38.912Z',
        updatedAt: '2020-08-22T17:30:54.668Z',
        __v: 0

    },
    starVideo: {
        _id: '5f41544fe0ec19692974cf94',
        name: 'Fake it till you make it',
        view: 'front',
        type: 'comparable',
        participatesAmount: 'solo',
        associatedObject: '5f4101a2f3f8fd3386e9dce0',
        thumbnail: 'https://danskill1.s3-eu-west-1.amazonaws.com/stars/Paul+Moldovan/Opening+Out/Fake+it+till+you+make+it.png',
        ownerUser: '5f40fc75ac07bc255b09ea4e',
        ownerRole: 99,
        associatedModel: 'Figure',
        key: 'https://danskill1.s3-eu-west-1.amazonaws.com/stars/Paul+Moldovan/Opening+Out/Fake+it+till+you+make+it.MP4',
        createdAt: '2020-08-22T17:22:23.419Z',
        updatedAt: '2020-08-22T18:35:45.313Z',
        __v: 0
    }
}

export class LabState {
    labItem: LabItem | null;
    error: Error | string | null; // track errors
}

export const initializeLabState = () => {
    return { labItem: null, error: null };
};

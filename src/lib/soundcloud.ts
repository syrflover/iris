import type SC from 'soundcloud.ts';
import type { IAsyncIterator_ } from '@syrflover/iterator';

import { Readable } from 'stream';

import axios from 'axios';
import { curry } from '@syrflover/iterator/dist/lib/utils/mod';

export interface SCUserCreatorSubscription {
    product: {
        id: string;
    };
}

export interface SCUserVisual {
    /* 'soundcloud:visuals:1263602'; */
    urn: string;
    /* 0; */
    entry_time: number;
    /* 'https://i1.sndcdn.com/visuals-000013566052-3jgCgN-original.jpg'; */
    visual_url: string;
}

export interface SCUser {
    avatar_url: string;
    city: string;
    comments_count: number;
    /* 'KR'; */
    country_code: string;
    /* '2012-03-13T16:51:58Z'; */
    created_at: string;
    creator_subscriptions: SCUserCreatorSubscription[];
    creator_subscription: SCUserCreatorSubscription;
    description: string;
    followers_count: number;
    followings_count: number;
    first_name: string;
    last_name: string;
    full_name: string;
    groups_count: number;
    id: number;
    kind: 'user';
    /* '2020-01-01T05:48:45Z'; */
    last_modified: string;
    likes_count: number;
    playlist_likes_count: number;
    permalink: string;
    permalink_url: string;
    playlist_count: number;
    reposts_count: number | null;
    track_count: number;
    /* 'https://api.soundcloud.com/users/13566052'; */
    uri: string;
    /* 'soundcloud:users:13566052'; */
    urn: string;
    username: string;
    verified: boolean;
    visuals: {
        urn: string;
        enabled: boolean;
        visuals: SCUserVisual[];
        tracking: null;
    };
}

export interface SCTranscoding {
    /* 'https://api-v2.soundcloud.com/media/soundcloud:tracks:823416955/ccfc9d31-0b84-4353-ab93-972c9a69c107/stream/hls'; */
    url: string;
    /* 'mp3_0_1'; */
    preset: string;
    /* 7742119; */
    duration: number;
    snipped: boolean;
    format: {
        /* 'hls'; */
        protocol: string;
        /* 'audio/mpeg'; */
        mime_type: string;
    };
    /* 'sq'; */
    quality: string;
}

export interface SCTrack {
    comment_count: number;
    full_duration: number;
    downloadable: boolean;
    /* '2020-05-19T02:13:45Z'; */
    created_at: string;
    description: string;
    media: { transcodings: SCTranscoding[] };
    title: string;
    publisher_metadata: {
        /* 'soundcloud:tracks:823416955'; */
        urn: string;
        contains_music: boolean;
        id: number;
    };
    /* 7742119; */
    duration: number;
    has_downloads_left: boolean;
    /* 'https://i1.sndcdn.com/artworks-A2R8eKOiI4mbkyvi-w1zPuA-large.jpg'; */
    artwork_url: string;
    public: boolean;
    streamable: boolean;
    /* 'StayHome COVID-19'; */
    tag_list: string;
    genre: string;
    id: number;
    reposts_count: number;
    state: 'processing' | 'failed' | 'finished';
    label_name: string | null;
    /* '2020-05-19T03:36:53Z'; */
    last_modified: string;
    commentable: boolean;
    /* 'ALLOW'; */
    policy: string;
    visuals: unknown | null;
    kind: 'track';
    purchase_url: string;
    sharing: 'private' | 'public';
    /* 'https://api.soundcloud.com/tracks/823416955'; */
    uri: string;
    secret_token: unknown | null;
    download_count: number;
    likes_count: number;
    /* 'soundcloud:tracks:823416955'; */
    urn: string;
    license:
        | 'no-rights-reserved'
        | 'all-rights-reserved'
        | 'cc-by'
        | 'cc-by-nc'
        | 'cc-by-nd'
        | 'cc-by-sa'
        | 'cc-by-nc-nd'
        | 'cc-by-nc-sa';
    purchase_title: string;
    /*  '2020-05-19T02:21:17Z'; */
    display_date: string;
    embeddable_by: 'all' | 'me' | 'none';
    release_date: unknown | null;
    user_id: number;
    /* 'NOT_APPLICABLE'; */
    monetization_model: unknown;
    waveform_url: string;
    permalink: string;
    permalink_url: string;
    user: SCUser;
    playback_count: number;
}

export const trackSC = curry((sc: SC, scURL: string) => sc.tracks.getV2(scURL));

export const streamHeaderURLSC = curry(async (sc: SC, scTrack: SCTrack) => {
    const { url: streamURL } = (await scTrack.media.transcodings
        .iter()
        .find((transcoding) => transcoding.format.protocol === 'hls'))!;

    const {
        data: { url: streamHeaderURL },
    } = await axios.get(streamURL, {
        params: { client_id: sc.api.clientID },
    });

    return streamHeaderURL;
});

export const streamHeaderSC = curry(async (sc: SC, streamHeaderURL: string) => {
    const { data: streamHeader } = await axios.get<string>(streamHeaderURL, {
        params: { Policy: sc.api.oauthToken },
        headers: {
            Origin: 'https://soundcloud.com',
            Referer: 'https://soundcloud.com/',
        },
    });

    return streamHeader;
});

export const streamSegmentsSC = async (streamHeader: string) =>
    streamHeader
        .split('\n')
        .iter()
        .filter((e) => e.startsWith('https://'));

export const streamSC = curry(
    (sc: SC, segments: IAsyncIterator_<string>): Promise<Readable> =>
        new Promise(async (resolve, reject) => {
            const stream = new Readable();

            segments.forEach(async (segment) => {
                const { data } = await axios.get(segment, {
                    params: {
                        Policy: sc.api.oauthToken,
                    },
                    responseType: 'arraybuffer',
                });
                stream.push(data);
            });

            resolve(stream);
        }),
);

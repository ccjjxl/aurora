import {DateTime} from "@node_modules/@auth/core/providers/kakao";

export interface Podcast {
    id: number;
    name: string;
    desc?: string;
    image: string;
    rssUrl: string;
    webSite?: string;
    createdAt: Date;
    lastUpdate?:Date;
}


export interface Episodes {
    id?: number
    podcastId?: number
    title: string;
    audio: string;
    img: string
    publishedAt: string;
    duration: string;
    description:string
    Listened?: boolean
}


//-------------------------//

export interface PodcastInfo {
    name: string;
    desc: string;
    rssUrl: string;
    webSite: string;
    image: string;
    episodes: Episodes[]
}

export interface  EpisodesInfo{
    title: string;
    audio: string;
    img: string
    publishedAt: string;
    duration: string;
    description:string
}




export interface ListentingEpisodes{
    id: number
    podcastId: number
    podcastName: string
    title: string;
    img: string
    publishedAt: string;
    duration: number;
    process: number;
}


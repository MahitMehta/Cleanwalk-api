export interface IPostModel {
    description: string;
    location: {
        type: string; 
        coordinates: number[],
    },
    userId: string; 
}
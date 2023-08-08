export type RandomWord = {
    readonly word: string
};

export type QuoteResponse = {
    readonly _id: string;
    readonly content: string;
    readonly author: string;
    readonly tags: string[];
    readonly authorSlug: string;
    readonly length: number;
    readonly dateAdded: Date;
    readonly dateModified: Date;
  };
  
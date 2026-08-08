export type GeneratedPostOption = {
  text: string;
  imagePrompt?: string;
};

export interface AIProvider {
  generatePostOptions(input: {
    strategy: string;
    recentDrafts: string[];
    optionCount: number;
  }): Promise<GeneratedPostOption[]>;
}


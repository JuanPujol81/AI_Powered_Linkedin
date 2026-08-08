export interface LinkedInPublisher {
  publish(input: {
    memberId: string;
    accessToken: string;
    text: string;
    idempotencyKey: string;
  }): Promise<{ externalPostId: string }>;
}


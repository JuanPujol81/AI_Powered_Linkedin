# LinkedIn Content Agent - Product Requirements Document

**Status:** Draft for validation  
**Version:** 0.1  
**Product stage:** Pre-MVP  
**Initial platform:** LinkedIn  

## 1. Product summary

LinkedIn Content Agent is an AI-assisted SaaS product that helps career-changing junior developers over 35 maintain a credible and consistent professional presence on LinkedIn with less time and mental effort.

The product remembers the user's desired professional identity, prepares complete post alternatives on a recurring schedule, generates an image for the selected post, and lets the user review, edit, approve, schedule, and publish it.

The product assists the user; it does not impersonate them or publish without explicit approval.

## 2. Problem statement

Career-changing developers over 35 often balance employment, family responsibilities, technical learning, and job searching. They understand that a consistent LinkedIn presence may improve their professional visibility and help them build relationships, but researching topics, generating ideas, writing posts, and maintaining a publishing routine requires time and mental energy they cannot consistently provide.

General-purpose AI tools reduce writing time but still require the user to initiate every session, repeat instructions, supply context, review the result, and manually manage publication. The unresolved problem is the recurring mental load and lack of a persistent content workflow.

## 3. Product vision

Enable professionals with limited time to turn four focused hours per week into a consistent and strategic LinkedIn presence.

The long-term product may become a broader AI-assisted professional visibility platform, but the MVP focuses only on preparing and publishing approved LinkedIn content.

## 4. Target customer

### Primary persona

A developer over 35 who is entering or transitioning into the technology industry and:

- Has a job, family responsibilities, or both.
- Is actively learning and building technical projects.
- Wants recruiters and other developers to recognize a clear professional identity.
- Has limited time or mental energy for social media.
- Can dedicate approximately four one-hour sessions per week to LinkedIn.
- Is willing to review content but does not want to begin every post from a blank page.

### Initial desired professional identity example

> Backend Developer specializing in Node.js, APIs, automation, and AI-assisted systems.

## 5. Jobs to be done

### Primary job

> When I am trying to build visibility while changing careers, help me maintain a credible LinkedIn publishing routine so I can demonstrate my professional direction and build relevant relationships without repeatedly spending mental energy deciding what to write.

### Supporting jobs

- Help the user communicate a consistent professional identity.
- Reduce the time between deciding to publish and having an acceptable draft.
- Preserve user preferences so instructions do not need to be repeated.
- Make approval and scheduling possible in a short, focused session.
- Keep the user in control of everything published under their identity.

## 6. MVP goals

1. Let a user define the professional identity they want to communicate.
2. Prepare three complete post alternatives for each of three weekly publishing slots.
3. Let the user select and edit a draft.
4. Generate one image for the selected draft.
5. Require explicit approval before publication.
6. Schedule and publish the approved post through an authorized LinkedIn connection.
7. Show the status and history of scheduled and published posts.
8. Determine whether the workflow reduces perceived mental effort and supports consistent publishing.

## 7. Non-goals for the MVP

- Guaranteed virality, follower growth, comments, profile views, or employment.
- Instagram, YouTube, or other publishing platforms.
- Video or voice generation.
- Automatic commenting or direct-message automation.
- Publication without explicit user approval.
- Advanced performance analytics or self-optimizing recommendations.
- Automated news and trend research.
- Team workspaces, enterprise controls, or multiple LinkedIn accounts.
- Multiple image alternatives per selected post.

## 8. Core user journey

1. The user creates an account.
2. The user defines a desired professional identity and content preferences.
3. The user optionally adds professional experience, skills, goals, projects, or a CV.
4. The user connects a LinkedIn account through OAuth.
5. The system prepares three complete drafts for an upcoming publishing slot.
6. The user receives a notification that drafts are ready.
7. The user reviews the alternatives and selects one.
8. The user edits the selected draft if necessary.
9. The system generates one image for the selected draft.
10. The user reviews the final text and image.
11. The user chooses a publication date and time.
12. The user explicitly approves the publication.
13. The system publishes the post at the scheduled time.
14. The system records success or displays a recoverable failure.

## 9. Functional requirements

### 9.1 Account and authentication

- **FR-AUTH-01:** A user can create an account and sign in securely.
- **FR-AUTH-02:** A user can sign out from active sessions.
- **FR-AUTH-03:** A user can request deletion of their product account and stored data.

### 9.2 Professional profile and strategy

- **FR-STRAT-01:** A user must define a desired professional identity before generating content.
- **FR-STRAT-02:** A user can optionally provide experience, skills, projects, career goals, audience, preferred topics, tone, calls to action, and excluded topics.
- **FR-STRAT-03:** A user can update the strategy at any time.
- **FR-STRAT-04:** Future generations must use the currently active strategy.
- **FR-STRAT-05:** CV upload is optional, not required for activation.
- **FR-STRAT-06:** The user must review extracted CV information before it becomes generation context.

### 9.3 LinkedIn connection

- **FR-LINK-01:** A user can connect a LinkedIn account using an authorized OAuth flow.
- **FR-LINK-02:** The product requests only the permissions required for the MVP.
- **FR-LINK-03:** A user can disconnect LinkedIn.
- **FR-LINK-04:** An expired or revoked authorization must stop publication and request reconnection.

### 9.4 Draft generation

- **FR-GEN-01:** The Basic plan provides three publishing slots per week.
- **FR-GEN-02:** Each slot produces three complete post alternatives.
- **FR-GEN-03:** Each alternative includes a hook, body, closing thought or call to action, and hashtags only when appropriate.
- **FR-GEN-04:** Drafts must follow the user's active strategy and avoid excluded topics.
- **FR-GEN-05:** The system stores the prompt version, provider, model, generation time, and validation result for operational analysis.
- **FR-GEN-06:** Invalid AI output must not be shown as a publication-ready draft.
- **FR-GEN-07:** Failed generation attempts may retry within bounded limits.

### 9.5 Review and editing

- **FR-EDIT-01:** A user can compare all three alternatives for a publishing slot.
- **FR-EDIT-02:** A user can select one alternative.
- **FR-EDIT-03:** A user can edit the selected text before approval.
- **FR-EDIT-04:** Changes are saved without altering the original generated version.
- **FR-EDIT-05:** A user can reject all alternatives without publishing.

### 9.6 Image generation

- **FR-IMG-01:** The Basic plan generates one image only after the user selects a text draft.
- **FR-IMG-02:** The image must be associated with that draft version.
- **FR-IMG-03:** The user can approve the image or continue with a text-only post if publication rules allow it.
- **FR-IMG-04:** The MVP does not generate three image alternatives.

### 9.7 Approval and scheduling

- **FR-SCHED-01:** Only a selected draft can be scheduled.
- **FR-SCHED-02:** The user must review the final text, image, date, and time before approval.
- **FR-SCHED-03:** Approval must be an explicit user action.
- **FR-SCHED-04:** The user can cancel or reschedule a publication before processing begins.
- **FR-SCHED-05:** The system must store the timezone used for scheduling.

### 9.8 Publication

- **FR-PUB-01:** The system publishes only an approved and currently valid draft.
- **FR-PUB-02:** Publication occurs as a background job rather than inside an interactive web request.
- **FR-PUB-03:** Every scheduled publication has an idempotency key to prevent duplicate LinkedIn posts during retries.
- **FR-PUB-04:** Transient failures use bounded retries and backoff.
- **FR-PUB-05:** Permanent failures are visible to the user and include a useful recovery action.
- **FR-PUB-06:** A successful publication stores the external LinkedIn post identifier and publication time.

### 9.9 History and notifications

- **FR-HIST-01:** The user can view draft, scheduled, publishing, published, cancelled, and failed states.
- **FR-HIST-02:** The system records important actions such as approval, rescheduling, cancellation, publication, and failure.
- **FR-NOTIF-01:** The user is notified when new drafts are ready.
- **FR-NOTIF-02:** The user is notified when publication succeeds or requires attention.

## 10. Business rules

- Nothing is published without explicit approval.
- Approval applies to one specific text version, image, date, and time.
- Editing approved content invalidates the previous approval and requires approval again.
- A retry must not create a duplicate LinkedIn post.
- PostgreSQL is the source of truth for product state.
- Redis and BullMQ coordinate background work but do not own the only copy of business records.
- The product must not claim guaranteed virality, engagement, recruiter interest, or employment.
- The Basic plan targets approximately 12 published posts and 36 generated drafts per month.

## 11. Non-functional requirements

### Security and privacy

- Encrypt LinkedIn access and refresh tokens at rest.
- Never expose provider tokens to the browser after authorization.
- Apply least-privilege permissions.
- Exclude secrets and unnecessary post content from logs.
- Require consent before processing an uploaded CV.
- Allow deletion of uploaded documents and extracted profile information.
- Prevent private CV fields from being included in generated content unless explicitly approved as public context.

### Reliability

- Scheduled jobs must survive API restarts.
- Publication retries must be idempotent.
- Failed background jobs must remain inspectable.
- Interactive requests should not wait for AI generation or LinkedIn publication to finish.

### Maintainability

- Begin as a modular monolith.
- Separate interactive API and background worker processes.
- Keep AI and LinkedIn provider code behind adapters.
- Version prompts and structured output schemas.
- Validate all external input and AI output at runtime.

### Observability

- Use structured logs with request and job correlation identifiers.
- Record generation latency, publication latency, retry count, and failure category.
- Provide user-facing status without exposing internal error details or secrets.

## 12. Pricing hypothesis

### Basic - EUR 4.99/month

- Three publishing slots per week.
- Three complete drafts per slot.
- One generated image for the selected draft.
- Review, editing, approval, scheduling, and LinkedIn publication.
- Basic publication history.

This price is a hypothesis, not a validated final price. AI generation, image generation, infrastructure, payment fees, support, and LinkedIn integration costs must be measured before launch.

Higher-priced plans may later include more posts, multiple image alternatives, advanced research, engagement assistance, and useful performance analytics.

## 13. Success metrics

### Product-controlled metrics

- Percentage of registered users who complete a strategy.
- Percentage who connect LinkedIn.
- Time from registration to first approved post.
- Percentage who publish at least two posts during the first week.
- Weekly approval and publication rate.
- Percentage of scheduled posts published without manual recovery.
- Duplicate-publication rate, with a target of zero.
- First-month retention and paid conversion.
- User-reported reduction in time and mental effort.

### Outcome indicators

The initial customer described these desirable 30-day outcomes:

- At least five comments per post.
- Seven to ten new followers.
- At least ten recruiter profile views.

These are useful research indicators but cannot be guaranteed or treated as direct product performance commitments.

## 14. MVP acceptance criteria

The MVP is ready for a controlled pilot when one user can:

1. Create an account and define a professional identity.
2. Connect LinkedIn securely.
3. Receive three valid complete drafts for one publishing slot.
4. Select and edit one draft.
5. Generate one associated image.
6. Explicitly approve and schedule the final post.
7. Have the post published once at the scheduled time.
8. See a clear success or failure state.
9. Cancel or reschedule before publication begins.
10. Disconnect LinkedIn and delete their stored product data.

## 15. Assumptions requiring validation

- Developers over 35 identify strongly enough with this niche to adopt a dedicated product.
- Three complete alternatives reduce mental effort rather than create decision fatigue.
- Three publishing slots per week are sustainable for the target customer.
- Users trust the product with LinkedIn publication access.
- One generated image per selected post provides enough value in the Basic plan.
- EUR 4.99 can support operating costs or serve as an acquisition tier.
- LinkedIn API access and applicable platform policies support the proposed publication workflow.

## 16. Future phases

### Phase 2

- Import permitted LinkedIn performance metrics.
- Compare post structures and topics.
- Provide explainable strategy recommendations.
- Suggest replies for user approval.
- Offer higher generation and image limits.

### Phase 3

- Instagram integration.
- Team workspaces and subscriptions.
- Richer media and templates.
- Trend and news discovery with source attribution.
- More advanced personalization and experimentation.

### Later exploration

- YouTube workflows.
- Video and voice generation.
- Multi-channel analytics.

## 17. Recommended next product step

Validate this PRD with at least five people matching the primary persona before committing to the complete architecture. Pay particular attention to willingness to connect LinkedIn, preferred draft volume, decision fatigue, willingness to pay, and whether consistency is painful enough to justify adopting another tool.

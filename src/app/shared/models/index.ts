import { Subscription } from 'rxjs';

export interface Subscriptions {
  [key: string]: Subscription;
}

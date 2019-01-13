import { PubSub } from 'apollo-server';

import * as IMAGE_EVENTS from './image';

export const EVENTS = {
  IMAGE: IMAGE_EVENTS,
};

export default new PubSub();

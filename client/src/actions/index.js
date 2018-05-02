import * as paymentActions from './paymentActions';
import * as clientActions from './clientActions';
import * as buyerActions from './buyerActions';
import * as cardActions from './cardActions';

export default {
  ...paymentActions,
  ...clientActions,
  ...buyerActions,
  ...cardActions
};

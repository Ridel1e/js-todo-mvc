/**
 * Created by ridel1e on 18/10/2016.
 */

export default (state = [], action) => {
  switch (action.type) {
    case 'SAVE_TASK':
      return [
        ...state,
        action.payload

      ];
    default:
      return state;
  }
}
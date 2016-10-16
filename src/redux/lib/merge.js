import _ from 'underscore';

/**
 * Merge fetched array or object into local data
 * TODO: Too manual. Use normalizr or something else.
 *
 * @param {Array} oldList
 * @param {Array|Object} response
 */
export default function mergeResponse(oldList, response) {
  const newList = _.isArray(response) ? response : [response];
  const objects = {};

  oldList.forEach((object) => objects[object.id] = object);
  newList.forEach((object) => objects[object.id] = object);

  const list = [];

  for (const object in objects) {
    if (objects.hasOwnProperty(object)) {
      list.push(objects[object]);
    }
  }

  return list;
}
